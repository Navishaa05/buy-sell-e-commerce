import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/slices/authSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navbarLinks } from '../../data';
import { getProfileData } from '../../services/operations/profile';
import { BsCart3 } from "react-icons/bs";
import { getCartData } from '../../services/operations/cart';

function Navbar() {
    const { token } = useSelector((state) => state.auth)
    const { total } = useSelector(state => state.cart)
    const [data, setData] = useState({})
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    function handleLogout() {
        dispatch(setToken(null));
        navigate('/');
    }

    useEffect(() => {
        async function getData() {
            const res = await getProfileData(token)
            setData(res);
        }

        getData();
    }, [])
    useEffect(() => {
        async function getCart() {
            const res = await getCartData(token, dispatch);
        }
        getCart();
    }, [])


    return (
        <div className='flex items-center bg-whitedark-bg-[#25262b] dark:text-[#f9f9f9] justify-between lg:px-6 lg:py-4 px-2 py-2'>
            <div className='lg:text-xl text-md font-semibold'>Welcome back, <span className='capitalize'>{data?.firstName}</span> 👋</div>
            <div className='flex items-center gap-6'>
                {navbarLinks.map((item) => (
                    <NavLink
                        key={item.id}
                        to={`${import.meta.env.VITE_APP_FRONTEND_URL}${item.link}`}
                        className={location.pathname === item.link
                            ? "text-yellow-500 font-bold border-b-2 border-yellow-500"
                            : "text-gray-500"
                        }
                    >
                        <p>{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <div className='flex items-center gap-6'>
                <div onClick={() => navigate('/dashboard/cart')} className='text-2xl relative cursor-pointer'>
                    <div className='absolute w-5 h-5 text-sm text-center bottom-3 left-4 z-10 bg-black text-white rounded-full'>{total}</div>
                    <BsCart3 /></div>
                <div className='relative rounded-full w-10 '>
                    <img onClick={() => setShowMenu(prev => !prev)} src={data?.dp} className='w-full h-full rounded-full' alt="dp" />
                    {showMenu && <div className='absolute top-12 right-0 p-2 w-[80px] h-[40px]  opacity-100 bg-[#2e2e2e] text-[#f0f0f0] rounded-sm'>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar