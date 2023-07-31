<script setup>
  import { ref, computed } from "vue"

  const gameIsActive = ref(false)

  const currentPlayer = ref("X")

  const selectedPlayerX = ref([])
  const selectedPlayerO = ref([])

  function gameGridClicked(index) {
    if ((currentPlayer.value = "X")) {
      selectedPlayerX.value.push(index)
      currentPlayer.value = "O"
    } else {
      selectedPlayerO.value.push(index)
      currentPlayer.value = "X"
    }
    checkWinningCombinations()
  }

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  function checkWinningCombinations() {
    console.log(selectedPlayerO, selectedPlayerX)
    if (
      winningCombinations.some((combination) => {
        console.log("combintaion", combination)
        combination.every((index) => {
          console.log(123, selectedPlayerX.value[index])
          console.log(456, selectedPlayerO.value)
          console.log(789, index)
        })
      })
    )
      return true
  }
</script>

<template>
  <div class="text-center text-white">
    <h1 class="text-3xl">Tic-Tac-Toe</h1>
    <button
      class="bg-blue-500 rounded-lg p-4"
      v-if="!gameIsActive"
      @click="gameIsActive = true"
    >
      New Game
    </button>
    <template v-else>
      <p>Player '{{ currentPlayer }}'s turn</p>

      <div class="grid grid-cols-3 max-w-sm m-auto mt-6">
        <div
          v-for="(item, index) in 9"
          @click="gameGridClicked(index)"
          class="border border-white w-20 h-20"
        >
          {{ index }}
        </div>
      </div>
    </template>
  </div>
</template>
