import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecipes } from '../redux/slices/recipeSlice';

const Recipe = () => {

    const { allRecipes, loading, error } = useSelector(state => state.recipeReducer)
    // console.log(allRecipes);

    const [show, setShow] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null)

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (item) => {
        setSelectedRecipe(item)
        setShow(true)

    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllRecipes())
    }, [])

    const [currentPage,setCurrentPage] = useState(1)
    const productPerPage = 8
    const totalPages = Math.ceil(allRecipes?.length/productPerPage)
    const currentPageLastIndex = currentPage * productPerPage
    const currentPageStartIndex = currentPageLastIndex - productPerPage
    const visibleRecipeCards = allRecipes?.slice(currentPageStartIndex,currentPageLastIndex)
  
    const navigateToNextPage = () => {
      if(currentPage!=totalPages)
      {
        setCurrentPage(currentPage+1)
      }
    }
  
    const navigateToPreviousPage = ()=>{
      if(currentPage!=1)
      {
        setCurrentPage(currentPage-1)
      }
    }

    return (

        <>
            <h1 className='p-3'>All Recipes</h1>
            <div className="row px-3 mt-2">

                {loading ?
                    <div>Loading...</div>
                    :
                    <>
                        {

                            allRecipes?.length > 0 ?
                            visibleRecipeCards.map(item => (
                                    <div className="col-md-3 px-md-4 my-2 d-flex justify-content-center">
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" style={{ width: '100%', height: '250px' }} src={item?.image} />
                                            <Card.Body>
                                                <Card.Title>{item?.name}</Card.Title>

                                                <Button variant="primary" className='text-center' onClick={() => handleShow(item)}>View Recipe</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                                :
                                <div>No Recipes are available...</div>
                        }
                    </>
                }

            </div>


            {selectedRecipe && <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton centered>
                    <Modal.Title className="w-100 text-center">{selectedRecipe.name}</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <img src={selectedRecipe.image} alt="" style={{ width: '100%', height: '250px' }} />
                    <h3>Ingredients:</h3>
                    <p> {selectedRecipe.ingredients?.join(', ')}</p>

                    <div>
                        <h4>Recipe:</h4>
                        <p>{selectedRecipe.instructions}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>}

            {/* pagination */}
            <div className="d-flex justify-content-center align-items-center m-5">
                <span onClick={navigateToPreviousPage} style={{ cursor: 'pointer' }}><i className='fa-solid fa-backward me-5'></i></span>
                <span className='font-bold'>{currentPage} of {totalPages}</span>
                <span onClick={navigateToNextPage} style={{ cursor: 'pointer' }}><i className='fa-solid fa-forward ms-5'></i></span>

            </div>
        </>
    )
}

export default Recipe
