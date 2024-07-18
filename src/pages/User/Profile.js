import Header from "../../components/Header";

import ProfileCard from "../../components/ProfileCard";
import { Container } from "react-bootstrap";

export default function Profile(){
  return (
    <div>
      <Header />
      <br></br>
      <Container>

      <ProfileCard/>
      </Container>

      </div>
  )
}
