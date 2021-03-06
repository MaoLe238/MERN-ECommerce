import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { mobile } from '../responsive'
import {useSelector,useDispatch} from "react-redux"
import { userRequest} from "../requestMethods"
import {order} from "../redux/apiCalls";


const KEY = process.env.REACT_APP_MOMO;

const Container = styled.div`` 
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px"})}
` 
const Title = styled.h1`
    font-weight: 300;
    text-align: center; 
` 
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
` 

const TopButton = styled.button`
    padding: 10px;
    font-weight: 400;
    cursor: pointer;
    border: ${(props)=>props.type === "filled" && "none"};
    background-color: ${props=>props.type === "filled" ? "teal" : "transparent"};
    color: ${props=>props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({ display: "none"})}
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column"})}
` 

const Info = styled.div`
    flex: 3;
`
const Input = styled.input`
    min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`

const Product = styled.div`
    display:flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px; 
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px"})}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px"})}
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 15px;
`

const Summary = styled.div`
    flex:1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between ;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`



const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [address, setAddress] = useState("");
    const [link, setLink] = useState("");    
    const dispatch = useDispatch();
    const user =  useSelector((state) => state.user.currentUser);
    const userId = user._id;
    
    
    
    const amount = cart.total;

    

    useEffect(() => {
        const makeRequest = async ()=>{
            try{
                const res = await userRequest.post("/checkout/payment",{
                    amount: cart.total * 100,
                });
                //  console.log(res);
                setLink(res.data);
                // console.log(link);

            }catch{}
        }
        makeRequest();
    },[cart.total]);
    
    const handleClick = () => {
        
        order(cart,amount,address);
        dispatch({type:"logout"});

    }


    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING </TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>    
                        <TopText>Your Wishlish (0))</TopText>
                    </TopTexts>     
                    <TopButton type="filled">CHECKOUT NOW</TopButton>     
                </Top>
                <Bottom>
                    <Info>
                    {cart.products.map(product=>(

                        <Product>
                        <ProductDetail>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName><b>Product: </b>{product.title}</ProductName>
                                <ProductId><b>ID:</b> {product._id}</ProductId>
                                <ProductColor color={product.color}/>
                                <ProductSize><b>Size: </b>{product.size}</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Add/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Remove/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                        </PriceDetail>
                        
                    </Product>
                       ))}
                       <Hr/>
                        <Input placeholder="Address" 
                        onChange={(e) => setAddress(e.target.value)}></Input>
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText >Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <a href={link}>
                        <Button onClick={handleClick}>CHECKOUT NOW</Button>
                        </a>

                        
                    </Summary>

                </Bottom>
            </Wrapper>

            <Footer/>

        </Container>
    )
}

export default Cart
