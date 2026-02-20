import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Counter } from 'counterapi'
import { use, useEffect, useState } from 'react'

async function getCount() {
  const counter = new Counter({ workspace: 'elivelton-santoss-team-2977' })
  const views = await counter.get('first-counter-2977')

  return { views: views.data.up_count }
}

async function trackEvent() {
  const counter = new Counter({ workspace: 'elivelton-santoss-team-2977' })
  const hasVisited = sessionStorage.getItem('page-views-incremented')

  if (!hasVisited) {
    try {
      await counter.up('first-counter-2977')
      sessionStorage.setItem('page-views-incremented', 'true')
    } catch (error) {
      console.error('Failed to track event:', error.message)
    }
  }
}

export function AccessCounter() {
  const queryClient = useQueryClient()
  const query = useQuery({
    queryKey: ['count-page-views'],
    queryFn: getCount,
  })
  const mutation = useMutation({
    mutationFn: trackEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['count-page-views'],
      })
    },
  })

  useEffect(() => {
    mutation.mutate()
  }, [])

  return (
    <div className="w-fit flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
        {query.data?.views} VISITAS
      </span>
    </div>
  )
}
