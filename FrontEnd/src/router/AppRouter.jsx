import { Routes, Route } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProfilePage } from '../pages/ProfilePage';
import { UpdateProfilePage } from '../pages/UpdateProfilePage';
import { LinkPage } from '../pages/LinkPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import UpdateLinkPage from '../pages/UpdateLinkPage';
import { UpdatePasswordPage } from '../pages/UpdatePasswordPage';
export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/user/:id' element={<ProfilePage />} />
            <Route path='/update' element={<UpdateProfilePage />} />
            <Route path='/link-detail/:id' element={<LinkPage />} />
            <Route path="/links/edit/:id" element={<UpdateLinkPage />} />
            <Route path="/user/password" element={<UpdatePasswordPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}
