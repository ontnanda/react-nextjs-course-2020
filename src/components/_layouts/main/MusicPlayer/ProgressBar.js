import React, { useRef } from 'react'
import { Flex, Box } from '@grid'

import { inject } from '@lib/store'

function ProgressBar(props) {
  const { playerStore } = props
  return (
    <Flex
      justifyContent="space-between"
      css={{
        background: 'transparent',
        height: '20px',
        alignItems: 'center',
      }}>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>
        {playerStore.progressBar.timeElapsed}
      </Box>
      <Box
        css={{
          flex: 1,
          height: '4px',
          '&:hover input[type="range"]::-webkit-slider-thumb': {
            visibility: 'visible',
          },
        }}>
        <div css={{ position: 'relative' }}>
          <progress
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              zIndex: '-1',
              '&::-webkit-progress-bar': {
                borderRadius: '5px',
              },
              '&::-webkit-progress-value': {
                borderRadius: '5px',
              },
            }}
            value={playerStore.progressBar.progress}
            max={1}
          />
          <input
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              outline: 'none',
              background: 'transparent',
              '&::-webkit-slider-thumb': {
                visibility: 'hidden',
              },
            }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={playerStore.progressBar.progress}
            onClick={e => {}}
            onMouseDown={() => {}}
            onChange={e => {
              let track = {
                playing: playerStore.nowPlaying.playing,
                id: playerStore.nowPlaying.id,
                name: playerStore.nowPlaying.title,
                artist: playerStore.nowPlaying.subTitle,
                image: playerStore.nowPlaying.image,
                previewUrl: playerStore.nowPlaying.url,
                playedSeconds:
                  e.target.value * playerStore.progressBar.loadedSecondsRaw,
                loadedSeconds: playerStore.progressBar.loadedSecondsRaw,
              }
              track.progress = e.target.value
              if (playerStore.nowPlaying.id) {
                playerStore.seekFunction.seekTo(track.playedSeconds)
              }
              playerStore.play(track)
            }}
            onMouseUp={() => {}}
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>
        {playerStore.progressBar.loadedSeconds}
      </Box>
    </Flex>
  )
}

export default inject('playerStore')(ProgressBar)
