import axios, { AxiosInstance } from 'axios'

interface OdooConfig {
  baseUrl: string
  db: string
  login: string
  password: string
}

const ODOO_CONFIG: OdooConfig = {
  baseUrl: import.meta.env.VITE_ODOO_URL || 'http://localhost:8069',
  db: import.meta.env.VITE_ODOO_DB || 'nexus',
  login: import.meta.env.VITE_ODOO_USER || 'admin',
  password: import.meta.env.VITE_ODOO_PASS || 'admin',
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? '/api/odoo' : ODOO_CONFIG.baseUrl,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

if (import.meta.env.DEV) {
  axiosInstance.interceptors.request.use((config) => {
    console.log('[Odoo Request]', config.method?.toUpperCase(), config.url)
    return config
  })
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Odoo Error]', error.message)
    throw new Error(error.response?.data?.error?.message || error.message)
  }
)

let _uid: number | null = null
let _authPromise: Promise<number> | null = null

export async function authenticate(): Promise<number> {
  if (_uid) return _uid
  if (_authPromise) return _authPromise

  _authPromise = (async () => {
    try {
      const response = await axiosInstance.post('/web/session/authenticate', {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: ODOO_CONFIG.db,
          login: ODOO_CONFIG.login,
          password: ODOO_CONFIG.password,
        },
        id: Date.now(),
      })

      if (response.data.result?.uid) {
        _uid = response.data.result.uid
        return _uid
      }

      throw new Error('Authentication failed')
    } catch (error) {
      _authPromise = null
      throw error
    }
  })()

  return _authPromise
}

export async function callModel<T>(
  model: string,
  method: string,
  args: unknown[] = [],
  kwargs: Record<string, unknown> = {}
): Promise<T> {
  await authenticate()

  const response = await axiosInstance.post('/web/dataset/call_kw', {
    jsonrpc: '2.0',
    method: 'call',
    params: {
      model,
      method,
      args,
      kwargs,
    },
    id: Date.now(),
  })

  if (response.data.error) {
    throw new Error(response.data.error.message || 'Odoo call failed')
  }

  return response.data.result as T
}

export function productImageUrl(productId: number, size: string = '256'): string {
  const baseUrl = import.meta.env.PROD ? '' : ODOO_CONFIG.baseUrl
  return `${baseUrl}/web/image/product.template/${productId}/image_${size}`
}

export function isAuthenticated(): boolean {
  return _uid !== null
}

export function resetAuth(): void {
  _uid = null
  _authPromise = null
}

export { axiosInstance }
