import axios from 'axios';
import React, { useEffect, useState } from 'react';

//data 받아오기 연습시 jsonplaceholder 참고

const User = (props) => {
    const [users, setUsers] = useState(null);       // 초깃값 설정
    const [loading, setLoading] = useState(false);  // 초깃값 설정
    const [error, setError] = useState(null);       // 초깃값 설정

    useEffect(() => {                               //useEffect 사용 컴포넌트 마운트 시 data 받아오기
        const getUsers = async () => {              // 동기처럼 사용 위함 async 사용
            try {
                setUsers(null);                     // 값 초기화
                setError(null);                     // 값 초기화
                setLoading(true);                   //date 받기 전 로딩 보여주기
                const response = await axios.get('https://jsonplaceholder.typicode.com/users'); //axios 사용 get 사용해 data 받아오기
                                                                                                //await 사용으로 data가 response에 할당 후 다음으로 넘어감
                setUsers(response.data);
            }
            catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getUsers();
    },[]);

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
export default User;