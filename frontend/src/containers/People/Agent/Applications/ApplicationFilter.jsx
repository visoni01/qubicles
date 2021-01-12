import React, { useState } from 'react'
import {
  List, MenuItem, ListItemText, Box,
} from '@material-ui/core'

export default function ApplicationFilter() {
  const [ selectedCategory, setSelectedCategory ] = useState(0)

  const applicationCategories = [
    { categoryId: 0, categoryTitle: 'All' },
    { categoryId: 1, categoryTitle: 'Invitations' },
    { categoryId: 2, categoryTitle: 'Pretraining' },
    { categoryId: 3, categoryTitle: 'Pending' },
    { categoryId: 4, categoryTitle: 'Archived' },

  ]

  return (
    <Box className='custom-box no-padding side-filter-root job-list'>
      <div className='mb-20'>
        <h2 className='h2 title'>Applications</h2>
      </div>
      <List className='filter-list-items'>
        { applicationCategories.map((applicationCategory) => (
          <MenuItem
            button
            onClick={ () => setSelectedCategory(applicationCategory.categoryId) }
            selected={ selectedCategory === applicationCategory.categoryId }
            key={ applicationCategory.categoryId }
          >
            <ListItemText classes={ { primary: 'list-item' } }>
              <h4 className='h4 light unbold'>
                {applicationCategory.categoryTitle}
              </h4>
            </ListItemText>
          </MenuItem>
        ))}
      </List>
    </Box>
  )
}
