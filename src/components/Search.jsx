import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { recipeSearch } from '../redux/slices/recipeSlice';


const Search = () => {
  const dispatch = useDispatch()

  return (
    <div className='px-5'>
       <FloatingLabel
        controlId="floatingInput"
        label="Search your Cuisine"
        className="mb-3"
        onChange={e=>dispatch(recipeSearch(e.target.value.toLowerCase()))}
      >
        <Form.Control type="text" placeholder="Recipe" />
      </FloatingLabel>

    </div>
  )
}

export default Search
