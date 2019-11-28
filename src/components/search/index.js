import React, { useState } from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'

import * as Playlist from '@features/playlist/services'
import { Fetch } from '@lib/api'

function SearchPage() {
  const { token } = useMember()
  const [q, setQ] = useState('')
  if (token === null) {
    return null
  }

  return (
    <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
      <Box width={1}>
        <input
          type="text"
          value={q}
          placeholder="Search for artists, albums or playlists..."
          css={{
            padding: '15px 20px',
            borderRadius: '40px',
            border: 'none',
            width: '500px',
          }}
          onChange={e => {
            setQ(e.target.value)
          }}
        />
      </Box>
      <Fetch service={() => Playlist.getSearchResult({ token: token, q: q })}>
        {({ data }) => {
          return (
            <SearchResults
              items={[
                {
                  title: 'Albums',
                  data: data.albums,
                  route: 'album-detail',
                },
                {
                  title: 'Playlists',
                  data: data.playlists,
                  route: 'playlist-detail',
                },
              ]}
              title="Albums"
              data={data.albums}
              route="album-detail"
            />
          )
        }}
      </Fetch>
    </Flex>
  )
}

export default withPage({ restricted: true })(SearchPage)
