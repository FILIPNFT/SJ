window.addEventListener('load', function() {
    var url = new URL(window.location.href);
    var productId = url.searchParams.get("id");

    if (productId) {
        document.getElementById("form-id").setAttribute("data-product-id", productId);
        setupAddAllergyDiagnosisButton(productId);
        setupFormSubmission(productId);
        setupDeleteButton(productId);
    }

    fetchAllergiesDiagnoses();
    fetchCategories(productId);
    fetchProductAllergiesDiagnoses(productId);
});
let allergiesDiagnoses = [];

function fetchAllergiesDiagnoses() {
    fetch('http://localhost:9000/alergijaDijagnoza/')
        .then(response => response.json())
        .then(data => {
            allergiesDiagnoses = data; // Sačuvajte podatke u globalni niz
            populateSelect(data, "spisak-alergijaDijagnoza");
        })
        .catch(error => console.error('Error fetching allergies/diagnoses:', error));
}
function fetchCategories(id) {
    fetch('http://localhost:9000/kategorija/')
        .then(response => response.json())
        .then(kategorije => {
            populateSelect(kategorije, "kategorija");
            if (id) fetchProductDetails(id);
        })
        .catch(error => console.error('Error fetching categories:', error));
}
function fetchProductDetails(id) {
    fetch(`http://localhost:9000/proizvod/${id}`)
        .then(response => response.json())
        .then(data => {
            populateProductForm(data);
        })
        .catch(error => console.error('Error fetching product details:', error));
}
function fetchProductAllergiesDiagnoses(productId) {
    fetch(`http://localhost:9000/proizvod/alergijeDijagnoze/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem sa pristupom serveru');
            }
            return response.json();
        })
        .then(alergijeDijagnoze => {
            alergijeDijagnoze.forEach(ad => {
                var badge = createBadge(ad.naziv, ad.id);
                document.getElementById("alergijaDijagnoza").appendChild(badge);
            });
        })
        .catch(error => console.error('Error fetching product allergies/diagnoses:', error));
}

function populateSelect(items, selectId) {
    const selectElement = document.getElementById(selectId);
    items.forEach(item => {
        let option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.naziv;
        selectElement.appendChild(option);
    });
}
function populateProductForm(data) {
    document.getElementById("naziv").value = data.naziv;
    document.getElementById("opis").value = data.opis;
    document.getElementById("kategorija").value = data.kategorija_id;
    document.getElementById("cena").value = data.cena;

}
function setupFormSubmission(productId) {
    document.getElementById("form-id").addEventListener("submit", function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitEditedProduct(productId);
        }
    });
}
function setupDeleteButton(productId) {
    var btnObrisi = document.getElementById('btnObrisi');
    btnObrisi.addEventListener('click', function () {
        if (confirm("Potvrdi brisanje ponovnim pritiskom na dugme!")) {
            deleteProduct(productId);
        }
    });
}
function addAllergyDiagnosis(productId, allergyDiagnosisId) {
    fetch('http://localhost:9000/proizvodAlergijaDijagnoza', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            proizvod_id: productId,
            alergijaDijagnoza_id: allergyDiagnosisId,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Problem sa slanjem zahteva');
            }
            return response.json();
        })
        .then((data) => {
            alert('Veza između proizvoda i alergije/dijagnoze je uspešno dodata.');
            var option = document.querySelector(`#spisak-alergijaDijagnoza > option[value='${allergyDiagnosisId}']`);
            var badge = createBadge(option.textContent, allergyDiagnosisId);
            document.getElementById("alergijaDijagnoza").appendChild(badge);
            option.disabled = true;
        })
        .catch((error) => {
            console.error('Greška:', error);
            alert('Došlo je do greške prilikom dodavanja veze.');
        });
}
function createBadge(text, id) {
    var naziv = document.querySelector(`#spisak-alergijaDijagnoza > option[value='${id}']`).textContent;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.textContent = naziv + " ";

    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn", "btn-default", "btn-sm");
    button.textContent = "X";
    button.addEventListener("click", function() {
        var productId = document.getElementById("form-id").getAttribute("data-product-id");
        deleteAllergyDiagnosis(productId, id);
        this.parentNode.parentNode.removeChild(this.parentNode);
        document.querySelector(`#spisak-alergijaDijagnoza > option[value='${id}']`).disabled = false;
    });

    span.appendChild(button);
    document.getElementById("alergijaDijagnoza").appendChild(span);
    document.getElementById("alergijaDijagnoza").appendChild(document.createTextNode(" "));
    return span;
}
function validateForm() {
    var nazivInput = document.getElementById("naziv");
    if (nazivInput.value.length < 3) {
        nazivInput.classList.add("error");
        alert("Naziv mora imati najmanje 3 karaktera.");
        return false;
    }

    var span = document.querySelectorAll("#alergijaDijagnoza > span.badge");
    if (span.length === 0) {
        alert("Morate dodati barem jednu alergiju ili dijagnozu.");
        return false;
    }
    return true;
}
function deleteAllergyDiagnosis(productId, allergyDiagnosisId) {
    const encodedProductId = encodeURIComponent(productId);
    const encodedAllergyDiagnosisId = encodeURIComponent(allergyDiagnosisId);

    fetch(`http://localhost:9000/proizvodAlergijaDijagnoza/${encodedProductId}/${encodedAllergyDiagnosisId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem sa brisanjem veze');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Veza je uspesno obrisana.');
        });
}
function submitEditedProduct(productId) {
    var editedProduct = {
        naziv: document.getElementById("naziv").value,
        opis: document.getElementById("opis").value,
        kategorija_id: document.getElementById("kategorija").value,
        cena: document.getElementById("cena").value
    };

    fetch(`http://localhost:9000/proizvod/${productId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProduct)
    })
        .then(response => response.json())
        .then(data => {
            alert('Proizvod uspešno izmenjen.');
            window.location.href = '/proizvodi.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Došlo je do greške prilikom izmene proizvoda.');
        });
}
function deleteProduct(productId) {
    fetch(`http://localhost:9000/proizvod/${productId}`, { method: "DELETE" })
        .then(resp => resp.json())
        .then(data => {
            alert("Obrisan je zapis iz tabele!");
            window.location.href = "/proizvodi.html";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function setupAddAllergyDiagnosisButton(productId) {
    document.getElementById("dodaj-alergijuDijagnozu").addEventListener("click", function() {
        var allergyDiagnosisId = document.getElementById("spisak-alergijaDijagnoza").value;

        if (!allergyDiagnosisId) {
            alert("Izaberi alergiju ili dijagnozu");
            return;
        }
        addAllergyDiagnosis(productId, allergyDiagnosisId);
    });
}

