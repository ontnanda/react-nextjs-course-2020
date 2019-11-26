import React from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'

import * as Playlist from '@features/playlist/services'
import { Fetch } from '@lib/api'

function SearchPage() {
  const { token } = useMember()

  if (token === null) {
    return null
  }
  return (
    <Fetch service={() => Playlist.getSearchResult({ token: token, q: 'ta' })}>
      {({ data }) => {
        return (
          <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
            <Box width={1}>
              <input
                type="text"
                value="blackpink"
                placeholder="Search for artists, albums or playlists..."
                css={{
                  padding: '15px 20px',
                  borderRadius: '40px',
                  border: 'none',
                  width: '500px',
                }}
                onChange={() => {}}
              />
            </Box>

            <SearchResults
              title="Albums"
              data={data.albums}
              route="album-detail"
            />
            <SearchResults
              title="Playlists"
              data={data.playlists}
              route="playlist-detail"
            />
          </Flex>
        )
      }}
    </Fetch>
  )
}

export default withPage({ restricted: true })(SearchPage)
