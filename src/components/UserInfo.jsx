import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from "../react-query";

export default function UserInfo(props) {
   const { data: userInfo} = useUserInfo();
   const navigate = useNavigate();

   const goToProfile = () => {
      if(userInfo?.name)
         navigate("/profile")
      else
         navigate("/login");
   };

   return (

      <div onClick={goToProfile} style={{ ...props.style }}  >
         {userInfo
            ? <UserOutlined />
            : <UserSwitchOutlined  />
         }
      </div>

   );
}
