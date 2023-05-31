import {
  Aside,
  AsideHeader,
  AvatarImg,
  ButtonAddNumber,
} from "./AsideComponent.styled";
import avatar from "../../img/avatar.jpg";
import { BsFillTelephonePlusFill } from "react-icons/bs";

export const AsideComponent = ({ onModalOpen }) => {
  return (
    <Aside>
      <AsideHeader>
        <AvatarImg src={avatar} alt="avatar" width="40px" height="40px" />
        <ButtonAddNumber
          type="button"
          onClick={onModalOpen}
          aria-label="add phone number"
        >
          <BsFillTelephonePlusFill />
        </ButtonAddNumber>
      </AsideHeader>
    </Aside>
  );
};
