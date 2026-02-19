import { Counter } from 'counterapi'
import { useEffect, useState } from 'react'

export function AccessCounter() {
  const [pageViews, setPageViews] = useState(0)
  const counter = new Counter({ workspace: 'elivelton-santoss-team-2977' })
  async function trackEvent() {
    const hasVisited = sessionStorage.getItem('page-views-incremented')
    if (!hasVisited) {
      try {
        await counter.up('first-counter-2977')
        sessionStorage.setItem('page-views-incremented', 'true')
      } catch (error) {
        console.error('Failed to track event:', error.message)
      }
    }
    const clickOnPage = await counter.get('first-counter-2977')

    setPageViews(clickOnPage.data.up_count)
    console.log(hasVisited)
  }

  useEffect(() => {
    trackEvent()
  }, [])

  return (
    <div className="w-fit flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        {pageViews.toLocaleString()} VISITAS
      </span>
    </div>
  )
}
