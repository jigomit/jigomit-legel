import { useRouter } from 'vue-router'

const prefetchedComponents = new WeakSet()
const prefetchedPaths = new Set()

const loadComponent = async (component) => {
  if (typeof component === 'function' && !prefetchedComponents.has(component)) {
    try {
      await component()
      prefetchedComponents.add(component)
    } catch (error) {
      // Ignore fetch failures to prevent navigation blocking
      console.warn('Prefetch failed:', error)
    }
  }
}

export function useRoutePrefetch() {
  const router = useRouter()

  const prefetchRoute = async (location) => {
    if (!location) return
    const target = router.resolve(location)

    if (!target || prefetchedPaths.has(target.fullPath)) {
      return
    }

    await Promise.all(
      target.matched.map(async (record) => {
        const component =
          record.components?.default ||
          record.component ||
          (typeof record.lazy === 'function' ? await record.lazy() : null)

        await loadComponent(component)
      })
    )

    prefetchedPaths.add(target.fullPath)
  }

  return { prefetchRoute }
}
