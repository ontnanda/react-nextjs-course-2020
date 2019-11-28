import React, { forwardRef } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Flex, Box } from '@grid'
import colors from '@features/_ui/colors'
import Link from '@link'

import { inject } from '@lib/store'
import PlayerStore from '@features/player/store'

function Button({ icon, onClick, forwardedRef }) {
  const css = {
    background: 'transparent',
    padding: '0px',
    margin: '0 10px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    border: 'none',
    color: colors.link,
  }

  return (
    <button onClick={onClick} css={css} ref={forwardedRef}>
      <Icon
        icon={icon}
        css={{
          marginTop: '8px',
          width: '13px',
        }}
      />
    </button>
  )
}

const ButtonControl = forwardRef((props, forwardedRef) => {
  return <Button {...props} forwardedRef={forwardedRef} />
})

SoundBar.defaultProps = {
  volume: {
    muted: false,
    level: 0.8,
  },
}

function SoundBar(props) {
  const { volume, playerStore } = props

  return (
    <Flex justifyContent="flex-end">
      <Box>
        <Flex
          justifyContent="center"
          css={{ width: '180px', alignItems: 'center' }}>
          <Box>
            <Link route="queue">
              <ButtonControl icon="list" />
            </Link>
          </Box>
          <Box>
            <ButtonControl
              icon={playerStore.playState.muted ? 'volume-mute' : 'volume-up'}
              onClick={() => {
                playerStore.muted()
              }}
            />
          </Box>
          <Box
            css={{
              flex: 1,
              '&:hover input[type="range"]::-webkit-slider-thumb': {
                visibility: 'visible',
              },
            }}
            pr={20}>
            <div css={{ position: 'relative' }}>
              <progress
                css={{
                  appearance: 'none',
                  position: 'absolute',
                  width: '100%',
                  height: '5px',
                  zIndex: '-1',
                  transition: 'width 0.1s ease',
                  '&::-webkit-progress-bar': {
                    borderRadius: '5px',
                  },
                  '&::-webkit-progress-value': {
                    borderRadius: '5px',
                  },
                }}
                value={playerStore.playState.volumn}
                max={1}
              />
              <input
                css={{
                  appearance: 'none',
                  position: 'absolute',
                  width: '100%',
                  height: '5px',
                  outline: 'none',
                  transition: 'opacity 0.2s',
                  background: 'transparent',
                  '&::-webkit-slider-thumb': {
                    visibility: 'hidden',
                  },
                }}
                type="range"
                readOnly
                min={0}
                max={1}
                step="any"
                value={playerStore.playState.volumn}
                onClick={() => {}}
                onMouseDown={() => {}}
                onChange={e => {
                  playerStore.adjustSoundLevel(e.target.value)
                }}
                onMouseUp={() => {}}
              />
            </div>
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}

export default inject('playerStore')(SoundBar)
