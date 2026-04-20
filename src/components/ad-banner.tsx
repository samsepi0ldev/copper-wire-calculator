import { useEffect } from 'react'

export function AdBanner({ dataAdSlot }: AdBanner.Props) {
  useEffect(() => {
    try {
      // biome-ignore lint/suspicious/noAssignInExpressions: <need to google adSense>
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      )
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])
  return (
    <div className="overflow-hidden mx-5 text-center">
      <ins
        className="adsbygoogle block"
        data-ad-client="ca-pub-8400309603550897"
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export namespace AdBanner {
  export type Props = {
    dataAdSlot: string
  }
}
