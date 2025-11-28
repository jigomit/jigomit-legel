import { useRouter } from 'vue-router'

const prefetchedComponents = new WeakSet()
const prefetchedPaths = new Set()

const shouldSkip = (target) => !target || prefetchedPaths.has(target.fullPath)

const normalizeComponentLoader = (component) => {
  if (!component) return null
  if (typeof component === 'function') return component
  if (typeof component === 'object' && typeof component.__asyncLoader === 'function') {
    return component.__asyncLoader
  }
  return null
}

const loadComponent = async (component) => {
  const loader = normalizeComponentLoader(component)
  if (!loader || prefetchedComponents.has(loader)) return

  try {
    await loader()
    prefetchedComponents.add(loader)
  } catch (error) {
    // Ignore fetch failures to prevent navigation blocking
    console.warn('Prefetch failed:', error)
  }
}

const resolveTarget = (router, location) => {
  if (!location) return null
  if (typeof location === 'object' && location.fullPath) {
    return location
  }
  return router.resolve(location)
}

const prefetchInternal = async (router, location) => {
  if (!router) return
  const target = resolveTarget(router, location)
  if (shouldSkip(target)) return

  const records = target.matched || []
  await Promise.all(
    records.map(async (record) => {
      let component = record.components?.default || record.component

      if (!component && typeof record.lazy === 'function') {
        try {
          component = await record.lazy()
        } catch (error) {
          console.warn('Lazy record preload failed:', error)
        }
      }

      await loadComponent(component)
    })
  )

  prefetchedPaths.add(target.fullPath)
}

export const createRoutePrefetcher = (router) => {
  const prefetchRoute = (location) => prefetchInternal(router, location)
  const prefetchRoutes = (locations = []) => Promise.all(locations.map(prefetchRoute))

  return { prefetchRoute, prefetchRoutes }
}

export function useRoutePrefetch() {
  const router = useRouter()
  return createRoutePrefetcher(router)
}
