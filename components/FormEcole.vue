<template>
  <div>
    <form v-if="!ecole.id" @submit.prevent="getLocation">
      <input
        class="input"
        type="text"
        placeholder="Entrer le nom de l'ecole"
        required
        v-model="ecole.titre"
      />
      <button>Ajouter l'ecole</button>
    </form>
    <form v-else @submit.prevent="addClasse">
      <select v-model="nom" class="input">
        <option value="">Choisisser la classe...</option>
        <option v-for="(nom, index) in nomsClasse" :key="index" :value="nom">
          {{ nom }}
        </option>
      </select>

      <input
        class="input"
        type="text"
        placeholder="filliere"
        v-model="filliere"
      />
      <button>Ajouter la classe</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormEcole",
  data() {
    return {
      nom: "",
      filliere: null,
      nomsClasse: ["Sil", "CP", "CE1", "CE2", "CM1", "CM2"],
    };
  },
  props: {
    ecole: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    async showPosition(position) {
      this.ecole.latitude = this.ecole.latitude || position.coords.latitude;
      this.ecole.longitude = this.ecole.longitude || position.coords.longitude;

      // Fetch location infos
      await axios
        .get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.ecole.latitude}&longitude=${this.ecole.longitude}&localityLanguage=en`
        )
        .then((res) => {
          const myObj = res.data;
          this.ecole.postal_code = myObj.postcode;
          this.ecole.city = myObj.locality;
          this.ecole.country = myObj.countryName;
        });

      await axios
        .post(process.env.baseUrl + "/ecole/", {
          titre: this.ecole.titre,
          latitude: this.ecole.latitude,
          longitude: this.ecole.longitude,
        })
        .then((res) => {
          this.$emit("submit", res.data);
          location.reload();
        });
    },
    addClasse() {
      if (this.nom && this.filliere) {
        this.$emit("submitClasse", { nom: this.nom, filliere: this.filliere });
        this.nom = "";
        this.filliere = null;
      }
    },
  },
};
</script>

<style scoped>
.input {
  border-bottom: 3px solid blue;
  width: 200px;
}
button {
  color: white;
  background-color: blue;
  border-radius: 1px;
  font-weight: bolder;
  padding: 5px 10px;
}
</style>