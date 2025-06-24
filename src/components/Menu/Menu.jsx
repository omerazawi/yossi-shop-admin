import React from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <div className='menu'>
        <ul>
            <li><NavLink className={({isActive}) => (isActive ? 'active-link' : '')} to='/'>דף הבית</NavLink></li>
            <li><NavLink className={({isActive}) => (isActive ? 'active-link' : '')} to='/products'>ניהול מוצרים</NavLink></li>
            <li><NavLink className={({isActive}) => (isActive ? 'active-link' : '')} to='/shipping'>ניהול הזמנות</NavLink></li>
            <li><NavLink className={({isActive}) => (isActive ? 'active-link' : '')} to='/users'>ניהול משתמשים</NavLink></li>
        </ul>
    </div>
  )
}
