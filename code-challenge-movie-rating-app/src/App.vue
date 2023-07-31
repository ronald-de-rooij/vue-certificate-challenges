<script setup>
  import { reactive, ref, computed } from "vue"
  import MovieItem from "./MovieItem.vue"

  import { items } from "./movies.json"
  const movies = ref(items)

  /*
 This is an Icon that you can use to represent the stars if you like
 otherwise you could just use a simple ⭐️ emoji, or * character.
*/
  const errors = reactive({
    name: null,
    description: null,
    image: null,
    inTheaters: null,
    genres: null,
  })
  const form = reactive({
    name: null,
    description: null,
    image: null,
    inTheaters: false,
    genres: null,
  })
  const validations = reactive({
    name: "required",
    genres: "required",
  })

  const genres = reactive([
    { text: "Drama", value: "Drama" },
    { text: "Crime", value: "Crime" },
    { text: "Action", value: "Action" },
    { text: "Comedy", value: "Comedy" },
  ])

  const validationRules = (rule) => {
    if (rule === "required") return /^ *$/

    return null
  }

  function validate() {
    let valid = true
    clearErrors()
    for (const [field, rule] of Object.entries(validations)) {
      const validation = validationRules(rule)
      if (validation) {
        if (validation.test(form[field] || "")) {
          errors[field] = `${field} is ${rule}`
          valid = false
        }
      }
    }

    return valid
  }

  function addMovie() {
    if (validate()) {
      const movie = {
        id: Number(Date.now()),
        name: form.name,
        description: form.description,
        image: form.image,
        genres: form.genres,
        inTheaters: form.inTheaters,
        rating: null,
      }
      movies.value.push(movie)
      hideForm()
    }
  }

  function cleanUpForm() {
    form.name = null
    form.description = null
    form.image = null
    form.genres = null
    form.inTheaters = false
    clearErrors()
  }

  function clearErrors() {
    errors.name = null
    errors.description = null
    errors.image = null
    errors.genres = null
    errors.inTheaters = null
  }

  const showMovieForm = ref(false)

  function hideForm() {
    showMovieForm.value = false
    cleanUpForm()
  }

  function showForm() {
    showMovieForm.value = true
  }

  const averageRating = computed(() => {
    const total = movies.value.reduce((acc, movie) => {
      return acc + movie.rating
    }, 0)
    return parseFloat(total / movies.value.length).toFixed(1)
  })

  function removeMovie(id) {
    console.log(id)
    movies.value = movies.value.filter((movie) => movie.id !== id)
  }
</script>

<template>
  <div class="app">
    <div v-if="showMovieForm" class="modal-wrapper">
      <div class="modal-wrapper-inner">
        <form @submit.prevent="addMovie">
          <div class="movie-form-input-wrapper">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              v-model="form.name"
              class="movie-form-input"
            />
            <span class="movie-form-error">{{ errors.name }}</span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="description">Description</label>
            <textarea
              type="text"
              name="description"
              v-model="form.description"
              class="movie-form-textarea"
            />
            <span class="movie-form-error">{{ errors.description }}</span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="image">Image</label>
            <input
              type="text"
              name="image"
              v-model="form.image"
              class="movie-form-input"
            />
            <span class="movie-form-error">{{ errors.image }}</span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="genre">Genres</label>
            <select
              name="genre"
              v-model="form.genres"
              class="movie-form-input"
              multiple
            >
              <option
                v-for="option in genres"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <span class="movie-form-error">
              {{ errors.genres }}
            </span>
          </div>
          <div class="movie-form-input-wrapper">
            <label for="genre" class="movie-form-checkbox-label">
              <input
                type="checkbox"
                id="genre"
                v-model="form.inTheaters"
                :true-value="true"
                :false-value="false"
                class="movie-form-checkbox"
              />
              <span>In theaters</span>
            </label>
            <span class="movie-form-error">
              {{ errors.inTheaters }}
            </span>
          </div>
          <div class="movie-form-actions-wrapper">
            <button type="button" class="button" @click="hideForm">
              Cancel
            </button>

            <button type="submit" class="button-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
    <div class="movie-actions-list-wrapper">
      <p class="text-white">
        Total Movies: {{ movies.length }} / Average Rating: {{ averageRating }}
      </p>
      <div class="flex-spacer"></div>
      <div class="movie-actions-list-actions">
        <button
          class="movie-actions-list-action-button"
          :class="{
            'button-primary': !showMovieForm,
            'button-disabled': showMovieForm,
          }"
          @click="showForm"
          :disabled="showMovieForm"
        >
          Add Movie
        </button>
      </div>
    </div>
    <div class="movie-list">
      <MovieItem
        v-for="(movie, index) in movies"
        :key="movie.id"
        :movie="movie"
        :movie-index="index"
        @remove="removeMovie($event)"
      />
    </div>
  </div>
</template>
