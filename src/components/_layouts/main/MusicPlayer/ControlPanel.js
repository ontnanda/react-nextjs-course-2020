import React from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'

import { inject } from '@lib/store'

function ButtonControl({ icon, circle = false, active = false, onClick }) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 10px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      <Icon
        icon={icon}
        css={{
          color: active ? 'green' : colors.link,
          width: '10px',
        }}
      />
    </button>
  )
}

function ControlPanel({ playerStore }) {
  return (
    <Flex>
      <Box>
        <ButtonControl
          icon="random"
          active={playerStore.playState.random}
          css={{
            color: playerStore.playState.random ? 'green' : colors.link,
            width: '10px',
          }}
          onClick={() => {
            playerStore.random()
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-backward"
          onClick={() => {
            playerStore.backPlay()
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon={playerStore.nowPlaying.playing === true ? 'pause' : 'play'}
          circle={true}
          onClick={() => {
            let track = {
              playing: !playerStore.nowPlaying.playing,
              id: playerStore.nowPlaying.id,
              name: playerStore.nowPlaying.title,
              artist: playerStore.nowPlaying.subTitle,
              image: playerStore.nowPlaying.image,
              previewUrl: playerStore.nowPlaying.url,
              playedSeconds: playerStore.nowPlaying.playedSeconds,
              loadedSeconds: playerStore.nowPlaying.loadedSeconds,
              timeElapsed: playerStore.nowPlaying.timeElapsed,
            }
            playerStore.play(track)
            playerStore.updateProgress(track)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-forward"
          onClick={() => {
            playerStore.nextPlay()
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="redo-alt"
          active={playerStore.playState.loop}
          css={{
            color: playerStore.playState.loop ? 'green' : colors.link,
            width: '10px',
          }}
          onClick={() => {
            playerStore.loop()
          }}
        />
      </Box>
    </Flex>
  )
}

export default inject('playerStore')(ControlPanel)
