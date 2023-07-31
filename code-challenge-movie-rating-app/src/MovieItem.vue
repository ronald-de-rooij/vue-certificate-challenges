<script setup>
  import { defineProps, ref } from "vue"

  import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/vue/24/solid"

  const props = defineProps({
    movie: {
      type: Object,
      required: true,
    },
    movieIndex: {
      type: Number,
      required: true,
    },
  })

  const emits = defineEmits(["edit", "remove", "update:rating"])

  function updateRating(rating) {
    props.movie.rating = rating
  }
</script>

<template>
  <div class="movie-item">
    <div class="movie-item-image-wrapper">
      <div class="movie-item-star-wrapper">
        <StarIcon
          id="rating"
          class="movie-item-star-rating-icon"
          :class="[movie.rating ? 'text-yellow-500' : 'text-gray-500']"
        />
        <div class="movie-item-star-content-wrapper">
          <span
            v-if="movie.rating"
            id="rating-stars"
            class="movie-item-star-content-rating-rated"
          >
            {{ movie.rating }}
          </span>
          <span v-else class="movie-item-star-content-rating-not-rated">
            -
          </span>
        </div>
      </div>
      <img :src="movie.image" class="movie-item-image" alt="" />
    </div>

    <div class="movie-item-content-wrapper">
      <div class="movie-item-title-wrapper">
        <h3 class="movie-item-title">{{ movie.name }}</h3>
        <div class="movie-item-genres-wrapper">
          <span
            v-for="genre in movie.genres"
            :key="`${movie.id}-${genre}`"
            class="movie-item-genre-tag"
            >{{ genre }}
          </span>
        </div>
      </div>
      <div class="movie-item-description-wrapper">
        <p class="movie-item-description">{{ movie.description }}</p>
      </div>
      <div class="movie-item-rating-wrapper">
        <span class="movie-item-rating-text">
          Rating: ({{ movie.rating }}/5)
        </span>

        <div class="movie-item-star-icon-wrapper">
          <button
            v-for="star in 5"
            :key="star"
            class="movie-item-star-icon-button"
            :class="[
              star <= movie.rating ? 'text-yellow-500' : 'text-gray-500',
            ]"
            :disabled="star === movie.rating"
            @click="updateRating(star)"
          >
            <StarIcon class="movie-item-star-icon" />
          </button>
        </div>
        <PencilIcon class="h-5 w-5 mr-3" />
        <TrashIcon class="h-5 w-5" @click="emits('remove', movie.id)" />
      </div>
    </div>
  </div>
</template>
