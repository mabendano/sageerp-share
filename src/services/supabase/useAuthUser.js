import { ref } from 'vue';
import useSupabase from '../../boot/supabase';

const user = ref(null);

export default function useAuthUser () {

    const { supabase } = useSupabase();

    const login = async ({ email, password }) => {

        const { user, error } = await supabase.auth.signIn({ email, password });
        if(error){
			console.log('Error', error);
		}
		console.log('user', user)
        return user;
    };

    const loginWithSocialProvider = async (provider) => {
        const { user, error } = await supabase.auth.signIn({ provider });
        if(error) throw error
        return user;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if(error) throw error;
    };

    const isLoggedIn = () => !!user.value;

    const register = async ({ email, password, ...meta}) => {
        const { user, error } = await supabase.auth.signUp(
            { email, password },
            {
                data: meta,
                redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
            }
        );
        if(error) throw error
        return user;
    };

    const update = async (data) => {
        const { user, error } = await supabase.auth.update(data);
        if(error) throw error
        return error;
    };

    const sendPasswordRestEmail = async (email) => {
        const { user, error } = await supabase.auth.api.resetPasswordForEmail(email);
        if(error) throw error
        return error;
    };

	const resetPassword = async (accessToken, newPassword) => {
		const { user, error } = await supabase.auth.api.updateUser(
			accessToken,
			{ password: newPassword }
		);
		if(error) throw error
        return error;
	}

    return{
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordRestEmail,
		resetPassword
    }
}
