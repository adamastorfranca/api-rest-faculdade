import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function Home() {

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
      <div style={{backgroundColor: 'white', borderRadius: '10px'}}>
        <h1 className='p-4'>Bem-vindo ao sistema acadêmico</h1>
      </div>
    </div>
  );
}
