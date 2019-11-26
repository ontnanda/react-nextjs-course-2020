import React from 'react'
import ReactPlayer from 'react-player'

// import PlayerStore from '@features/player/store'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)
function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onSeek={e => console.log('onSeek', e)}
      onProgress={data => {
        let track = {
          id: playerStore.nowPlaying.id,
          playing: playerStore.nowPlaying.playing,
          name: playerStore.nowPlaying.title,
          artist: playerStore.nowPlaying.subTitle,
          image: playerStore.nowPlaying.image,
          previewUrl: playerStore.nowPlaying.url,
          playedSeconds: data.playedSeconds,
          loadedSeconds: data.loadedSeconds,
        }
        playerStore.play(track)
      }}
      onEnded={() => {
        console.log('onEnded')
      }}
    />
  )
}
