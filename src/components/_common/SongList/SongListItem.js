import React, { useState } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Flex, Box } from '@grid'
import colors from '@features/_ui/colors'
import { convertSecondsToMinutes } from '@features/player/utilities'

// import PlayerStore from '@features/player/store'

import { inject } from '@lib/store'

export default inject('playerStore')(SongListItem)
function SongListItem({ track, playerStore }) {
  const [hover, setHover] = useState(false)

  if (track.previewUrl === null) {
    return null
  }

  // const playerStore = new PlayerStore()
  let icon = 'music'
  let bgHover = {
    '&:hover': {
      background: colors.background.light,
    },
  }
  if (
    track.id === playerStore.nowPlaying.id &&
    playerStore.nowPlaying.id !== ''
  ) {
    if (playerStore.nowPlaying.playing) {
      icon = 'pause'
      bgHover = {
        background: colors.background.light,
      }
    } else {
      icon = 'play'
    }
  } else {
    if (hover) {
      icon = 'play'
    } else {
      icon = 'music'
    }
  }
  return (
    <Box
      width={1}
      css={bgHover}
      onMouseOver={() => {
        setHover(true)
        // setTrakIdHover(track.id)
        // console.log(track.id)
      }}
      onMouseOut={() => setHover(false)}>
      <Flex
        flexWrap="wrap"
        css={{
          padding: '8px 20px',
        }}>
        <Box css={{ padding: '5px', alignSelf: 'center' }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => {
              track.playing =
                track.id === playerStore.nowPlaying.id
                  ? !playerStore.nowPlaying.playing
                  : true

              playerStore.play(track)
            }}>
            <Icon
              icon={icon}
              css={{
                color:
                  icon === 'play' || icon === 'pause' ? 'green' : colors.link,
              }}
            />
          </button>
        </Box>
        <Box
          css={{
            flex: 1,
            padding: '5px',
          }}>
          <Flex
            flexWrap="wrap"
            css={{
              padding: '0px 20px 0px 0px',
            }}>
            <Box width={1} css={{ color: colors.link }}>
              {track.name}
            </Box>
            <Box width={1} css={{ fontSize: '0.9em', paddingTop: '10px' }}>
              {track.artist} • {track.album}
            </Box>
          </Flex>
        </Box>
        <Box
          css={{
            padding: '0px 10px',
            fontSize: '0.85em',
            color: colors.link,
          }}>
          <button
            css={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
            }}
            onClick={() => {}}>
            <Icon
              icon="plus-circle"
              css={{
                color: colors.link,
              }}
            />
          </button>
        </Box>
        <Box
          css={{
            paddingTop: '5px',
            fontSize: '0.85em',
          }}>
          {convertSecondsToMinutes(track.durationMs / 1000)}
        </Box>
      </Flex>
    </Box>
  )
}
