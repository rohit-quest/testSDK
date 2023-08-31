import Cookies from 'universal-cookie';

class General {
    static shareInstance = new General();

    setUserAddress(address: string): void {
        const cookies = new Cookies();
        cookies.set('userAddress', address.toLowerCase(), { path: '/' });
    }

    getUserAddress(): string | undefined {
        const cookies = new Cookies();
        return cookies.get('userAddress');
    }

    setUserId(userId: string): void {
        const cookies = new Cookies();
        cookies.set('userId', userId, { path: '/' });
    }

    getUserId(): string | undefined {
        const cookies = new Cookies();
        return cookies.get('userId');
    }

    setToken(token: string): void {
        const cookies = new Cookies();
        cookies.set('userToken', token, { path: '/' });
    }

    getToken(): string | undefined {
        const cookies = new Cookies();
        return cookies.get('userToken');
    }
}

export default General;
