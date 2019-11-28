import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'

// import PlayerStore from '@features/player/store'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)
function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying
  const seekPoint = useRef(null)

  useEffect(() => {
    playerStore.seek(seekPoint.current)
  }, [])

  return (
    <ReactPlayer
      ref={seekPoint}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={playerStore.playState.volumn}
      muted={playerStore.playState.muted}
      onSeek={e => console.log('onSeek', e)}
      onProgress={data => {
        playerStore.updateProgress({
          playedSeconds: data.playedSeconds,
          loadedSeconds: data.loadedSeconds,
        })
      }}
      onEnded={() => {
        playerStore.nextPlay()
      }}
    />
  )
}
