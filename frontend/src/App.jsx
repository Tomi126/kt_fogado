import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';
import './styles/fogado.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/fogado')
      .then((res) => res.json())
      .then(setRooms)
      .catch((err) => console.error('Error loading /fogado:', err));

    fetch('http://localhost:3000/kihasznaltsag')
      .then((res) => res.json())
      .then(setOccupancy)
      .catch((err) => console.error('Error loading /kihasznaltsag:', err));

    fetch('http://localhost:3000/foglaltsag')
      .then((res) => res.json())
      .then(setBookings)
      .catch((err) => console.error('Error loading /foglaltsag:', err));
  }, []);

  return (
    <>
      <div class="bg-fej">
          <img src="./src/img/top.jpg" alt="" id="topimg" />
      </div>

      <div>
        <div>
          <div class="contentbox" id='contbx1'>
            <h3>Napraforgós Nemzeti Tanúsító Védjegy célja</h3>
            <p>
            A falusi szálláshelyek napraforgós Nemzeti Tanúsító Védjegye a FATOSZ által több mint tíz éve létrehozott, és működtetett minősítési rendszer alapjaira épülve 2011 óta a minőségi falusi turizmus szimbóluma. A védjegy alapvető célja, hogy – összhangban az egyes szálláshelyek működtetéséről szóló 239/2009. Korm. rendeletben foglaltakkal – garanciát nyújtson a szálláshely szolgáltatás minőségének megfelelő színvonalára.  A falusi vendégházak 1-4 napraforgós besorolást nyerhetnek el a külső, belső megjelenés, a felszereltség, a szolgáltatások színvonala, valamint a szállásadó személyes felkészültségének, szakmai képzettségének függvényében.
            <a href="https://falusiturizmus.eu/" target='new'> <br />Tájékoztató oldal</a> <br />
            <img src="./src/img/logo.png" alt="" />
            </p>
            <p>
              <img src="./src/img/holloko_masolata.jpg" alt="" id="hollokoimg" class="img-thumbnail" />
            </p>
            
          </div>

          <div class="contentbox" id='contbx2'>
            <h3>Falusi szálláshely fajtái</h3>
            <ul>
              <li>Vendégszoba: a vendégek rendelkezésére bocsátható önálló lakóegység, amely egy lakóhelyiségből, és a minősítéstől függően a hozzátartozó mellékhelyiségekből áll.</li> 
              <li>Lakrész: önálló épület kettő, illetve több szobából álló lehatárolt része a minősítéstől függően hozzátartozó mellékhelyiségekkel együtt</li>
              <li>Vendégház: önálló épület, több szobával, mellékhelyiségekkel és főzési lehetőséggel rendelkező lakó-, illetve üdülőegység, családok vagy kisebb csoportok elszállásolására.</li> 
              <li>Sátorozóhely: csak valamelyik falusi szálláshely típus mellett, mintegy azt kiegészítve üzemeltethető az előírt feltételek megléte esetén. Pl.: falusi vendégház sátorozóhellyel.</li>
            </ul>
            <p><img src="./src/img/ketagyas.jpg" alt="" id="ketagyimg" class="img-thumbnail" /></p>
            <div id='box2adjust'></div>
          </div>

          <div class="contentbox" id='contbx3'>
            <h3>A hét törpe fogadó</h3>
            <table class="table table-striped" id="fogado-table">
              <thead>
                <tr>
                  <th id="custom-cell">Szoba neve</th>
                  <th id="custom-cell">Ágyak száma</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => (
                  <tr id="custom-cell" key={i}>
                    <td id="custom-cell">{room['Szobanév']}</td>
                    <td id="custom-cell">{room['Ágyak száma']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>A házban összesen 21 fő fér el. <br />Felszereltségük:</p>
            <ol>
              <li>Ruhásszekrény</li>
              <li>Saját fürdőszoba zuhanytálca</li>
              <li>WC (fürdőszobával egyben)</li>
            </ol>
            <div id='box3adjust'></div>
          </div>
        </div>
      </div>

      

      <select class="form-select" aria-label="Default select example" id='szobaselect'>
        <option value="1">Szende</option>
        <option value="2">Szundi</option>
        <option value="3">Morgó</option>
        <option value="4">Hapci</option>
        <option value="5">Tudor</option>
        <option value="6">Vidor</option>
        <option value="7">Kuka</option>
      </select>
      <button type="button" class="btn btn-outline-dark" id="adatbtn">Adatok</button>



    <div id="tablebox">
            <div>
              <h3>A vendégszobák foglaltsága</h3>
              <table class="table table-striped" id="foglaltsag-table">
                <thead>
                  <tr>
                    <th>Szoba</th>
                    <th>Érkezés</th>
                    <th>Távozás</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i}>
                      <td>{b['Szobanév']}</td>
                      <td>{b['Érkezés'] ? b['Érkezés'].split('T')[0] : '—'}</td>
                      <td>{b['Távozás'] ? b['Távozás'].split('T')[0] : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            
        <div>
        <h3>A szobák kihasználtsága</h3>
        <table class=" table table-striped" id="kihasz-table">
          <thead>
            <tr>
              <th>Szoba</th>
              <th>Vendégek száma</th>
              <th>Vendégéjszakák</th>
            </tr>
          </thead>
          <tbody>
            {occupancy.map((o, i) => (
              <tr key={i}>
                <td>{o.szobanev}</td>
                <td>{o.vendegek}</td>
                <td>{o.vendegejszakak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default App;
