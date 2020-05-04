var db;
var shortName = 'pesele4';
var version = '1.0';
var displayName = 'pesele4';
var maxSize = 65535;
  function errorHandler(transaction, error) {
     alert('Błąd: ' + error.message + ' kod błędu: ' + error.code);
  }
  function successCallBack() {
  }
  function nullHandler(){};
$$(document).on('page:init', '.page[data-name="pesel"]', function(e){
  $$('button[id="sprawdz"]').on('click', function() {
    var cyfra = new Array();
    var pesel_dlugosc = document.getElementById("pesel").value;
    var wagi = [1,3,7,9,1,3,7,9,1,3,1];
    var suma_kontrolna=0;

    for (i=0;i<11; i++)
    {
      cyfra[i] = Number(String(pesel_dlugosc.substring(i,i+1)));
      if (isNaN(cyfra[i]))
      {
        return;
      }
    }
    
    for (var i=0;i<11;i++)
        suma_kontrolna+=wagi[i]*cyfra[i];

    var sprawdz_rok = 1900+cyfra[0]*10+cyfra[1];
    if (cyfra[2]>=2 && cyfra[2]<8)
        sprawdz_rok+=Math.floor(cyfra[2]/2)*100;
    if (cyfra[2]>=8)
        sprawdz_rok-=100;

    var miesiac = (cyfra[2]%2)*10+cyfra[3];
    var dzien = cyfra[4]*10+cyfra[5];

    function zla_suma(sumaa){
        document.getElementById("wynik").innerHTML = (sumaa?"<h3>Zła suma</h3>" : "<h3>Suma okej</h3>");
        return sumaa;
    }

    function zla_dlugosc(dlugosc){
        document.getElementById("wynik2").innerHTML = (dlugosc?"<h3>Zła długość</h3>" : "<h3>Długosć okej</h3>");
        return dlugosc;
    }

    function zla_data(data){
        document.getElementById("wynik3").innerHTML = (data?"<h3>Zła data</h3>" : "<h3>Data okej</h3>");
        return data;
    }

    var dlug = (zla_dlugosc(pesel_dlugosc.length != 11));
    var sum = (zla_suma((suma_kontrolna%10)!=0));
    var dat = (zla_data(!sprawdz_date(dzien,miesiac,sprawdz_rok)));
    var dlug_d = !(zla_dlugosc(pesel_dlugosc.length != 11));
    var sum_d = !(zla_suma((suma_kontrolna%10)!=0));
    var dat_d = !(zla_data(!sprawdz_date(dzien,miesiac,sprawdz_rok)));

    if (dlug||sum||dat)
    {
        document.getElementById("pesel").style.backgroundColor = "yellow";
    }
    if ((dlug&&sum)||(dlug&&dat)||(sum&&dat))
    {
        document.getElementById("pesel").style.backgroundColor = "orange";
    }
    if (dlug&&sum&&dat)
    {
        document.getElementById("pesel").style.backgroundColor = "red";
    }
    if (dlug_d&&sum_d&&dat_d)
    {
        document.getElementById("pesel").style.backgroundColor = "green";
        AddValueToDB();
        
    }
    function sprawdz_date(dzien,miesiac,rok)
    {
      var data = new Date(rok,miesiac-1,dzien);
      return data.getDate()==dzien &&
             data.getMonth()==miesiac-1 &&
             data.getFullYear()==rok;
    }
});
      if (!window.openDatabase) {
         alert('Twoje urządzenie nie obsługuje SQLite!');
      }
      db = openDatabase(shortName, version, displayName,maxSize); 
      db.transaction(function(tx){ 
       tx.executeSql( 'CREATE TABLE IF NOT EXISTS pesele(Id INTEGER NOT NULL PRIMARY KEY, pesel TEXT NOT NULL)',[],nullHandler,errorHandler);},errorHandler,successCallBack);


   $$('#pokaz').on('click', () => {
    console.log("odswiezanie");
     ListDBValues();
   })

   return;
});
 function ListDBValues() {
 if (!window.openDatabase) {
  alert('To urządzenie nie obsługuje SQLite!');
  return;
 }
 $$('#wyswietl').html(''); 
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM pesele;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $$('#wyswietl').append('<br><tr>' + '<td> ' + row.Id + '</td> '  + '. ' + '<td>' +row.pesel);
        }
       }
     },errorHandler);
 },errorHandler,nullHandler);
}
function AddValueToDB() {
   if (!window.openDatabase) {
     alert('To urządzenie nie obsługuje SQLite!');
      return;
   }
   db.transaction(function(transaction) {
     transaction.executeSql('INSERT INTO pesele(pesel) VALUES (?)',[$$('#pesel').val()],
       nullHandler,errorHandler);
     });
   ListDBValues();
    return false;
  }
    },
  },
});
