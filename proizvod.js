window.addEventListener('load', function() {
    var id;
    var url = new URL(window.location.href);
    id = url.searchParams.get("id");

    if (id) {

        fetch(`http://localhost:9000/proizvod/${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("naziv").value = data.naziv;
                document.getElementById("opis").value = data.opis;
                document.getElementById("kategorija").value = data.kategorija_id;
                document.getElementById("cena").value = data.cena;
            })
            .catch(error => console.error('Došlo je do greške:', error));
    }

    document.getElementById("dodaj-alergijuDijagnozu").addEventListener("click", function() {
        var id = document.getElementById("spisak-alergijaDijagnoza").value;
        if (!id) {
            alert("Izaberi alergiju ili dijagnozu");
            return;
        }
        dodajAlergijuDijagnozu(id);
    });

    // Event listener za submit forme
    document.getElementById("form-id").addEventListener("submit", function(e) {
        e.preventDefault();
        var validno = validacija();

        if (validno) {
            var izmenjenProizvod = {
                naziv: document.getElementById("naziv").value,
                opis: document.getElementById("opis").value,
                kategorija_id: document.getElementById("kategorija").value,
                cena: document.getElementById("cena").value
            };

            fetch(`http://localhost:9000/proizvod/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(izmenjenProizvod)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Proizvod uspešno izmenjen.');
                    window.location.href = '/proizvodi.html'; // Redirekcija na spisak proizvoda
                })
                .catch(error => {
                    console.error('Došlo je do greške:', error);
                    alert('Došlo je do greške prilikom izmene proizvoda.');
                });
        }
    });

    function dodajAlergijuDijagnozu(id) {
        var naziv = document.querySelector(`#spisak-alergijaDijagnoza > option[value='${id}']`).textContent;

        var span = document.createElement("span");
        span.classList.add("badge");
        span.classList.add("bg-secondary");
        span.dataset.id = id;
        span.textContent = naziv + " ";

        var button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn");
        button.classList.add("btn-default");
        button.classList.add("btn-sm");
        button.textContent = "X";

        button.addEventListener("click", function() {
            var id = this.parentNode.dataset.id;
            this.parentNode.parentNode.removeChild(this.parentNode);
            document.querySelector(`#spisak-alergijaDijagnoza > option[value='${id}']`).disabled = false;
        });

        span.appendChild(button);
        document.getElementById("alergijaDijagnoza").appendChild(span);
        document.getElementById("alergijaDijagnoza").appendChild(document.createTextNode(" "));
    }

    function validacija() {
        var nazivInput = document.getElementById("naziv");
        if (nazivInput.value.length < 3) {
            nazivInput.classList.add("error");
            nazivInput.classList.remove("success");
            alert("Naziv mora imati najmanje 3 karaktera.");
            return false;
        }

        var spanovi = document.querySelectorAll("#alergijaDijagnoza > span.badge");
        if (spanovi.length === 0) {
            alert("Morate dodati barem jednu alergiju ili dijagnozu.");
            return false;
        }
        return true;
    }

    var btnObrisi = document.getElementById('btnObrisi');
    btnObrisi.addEventListener('click', function () {
        if (confirm("Potvrdi brisanje")) {
            fetch(`http://localhost:9000/proizvod/${id}`, { method: "DELETE" })
                .then(resp => resp.json())
                .then(data => {
                    alert("Obrisan je zapis " + data);
                    window.location.href = "/proizvodi.html"; // Redirekcija na spisak proizvoda
                })
                .catch(error => {
                    console.error('Došlo je do greške:', error);
                });
        } else {
            return;
        }
    });
});
