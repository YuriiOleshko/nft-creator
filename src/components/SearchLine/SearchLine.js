import React,{useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {validation} from "../../utils/helpers";

const SearchLine = ({handleSubmit,change,value,labelInput,labelBtn,novalid}) => {
    const [error , setError] = useState(false)

    const submitWithValid =(ev)=>{
        ev.preventDefault()

        if(validation(value,novalid)){
            handleSubmit()
        }else{
            setError(true);
        }
    }
    const handleChange= (ev)=>{
        setError(false);
        change(ev.target.value)
    }
    return (
        <Form className='main__search'  onSubmit={submitWithValid}>
            <Form.Group controlId="searcId" className="main__group" >
                <Form.Label>{labelInput}</Form.Label>
                <Form.Control type="text" placeholder="by address" className="main__input" onChange={(ev)=>handleChange(ev)} required value={value} />
                {error&&<Form.Text className="main__error">
                    This not valid address , please check his.
                </Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit" className="main__btn">
                {labelBtn}
            </Button>
        </Form>
    );
};

export default SearchLine;
