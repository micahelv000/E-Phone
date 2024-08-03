import Header from "../components/Header";
import Bottom from '../components/Bottom';

export default function Home(){
  return (
    <div>
      <Header/>
      <center>
      <h1>404</h1>
      <p>Maybe the page not found</p>
      <p>Or maybe you dont have access to this page</p>
      <img src="https://news.gsu.edu/files/2019/10/monkey-800x600.jpg" alt="happy-monkey" />
      </center>
      <Bottom style={{ paddingBottom: '0px' }} />

      </div>
  )
}
