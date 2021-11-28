import axios from 'axios';
import React, { useEffect, useReducer } from 'react';

//data 받아오기 연습시 jsonplaceholder 참고
// 왜 사용하는가 ? reducer 함수를 따로분리해서 재사용 가능
function reducer(state, action) {
    switch (action.type) {
        case 'SUCCESS':
            return({
                users: action.data,
                error: null,
                loading: false
            }); 
        case 'ERROR':
            return({
                users: null,
                error: action.error,
                loading: false
            });  
        case 'LOADING':
             return({
                users: null,
                error: null,
                loading: true
            }); 
        default:
            break;
    }
}


const UserUseReducer = () => {
    const [state, dispatch] = useReducer(reducer, {
        users: null,                                //해당 초깃값
        error: null,                                //해당 초깃값
        loading: false                              //해당 초깃값
    });

    useEffect(() => {                               //useEffect 사용 컴포넌트 마운트 시 data 받아오기
        const getUsers = async () => {              // 동기처럼 사용 위함 async 사용
            try {
                dispatch({ type: 'LOADING' });      // loading 액션발생
                const response = await axios.get('https://jsonplaceholder.typicode.com/users'); //axios 사용 get 사용해 data 받아오기
                dispatch({ type: 'SUCCESS', data: response.data }); // success 액션발생
            }
            catch(e) {
                dispatch({ type: 'ERROR' });    //error 액션발생
            }
            
        };
        getUsers();
    },[]);
    
    const {users, error, loading} = state;  //비구조 할당 사용
    if(!users){
        return(
            null
        );
    };

    if(loading){
        return(
            <div>로딩중</div>
        );
    };

    if(error){
        return(
            <div>에러발생</div>
        );
    };

    console.log(users);

    return(
        <ul>
            {
                users.map(user => (
                    <li key={user.id}>
                        <p>사용자 : {user.name}</p>
                        <p>이메일 : {user.email}</p>
                    </li>
                ))
            }
        </ul>
    );
};
export default UserUseReducer;