console.log('Hello this is english janala');
// Load levels Number
const lodeLevel = async () => {
   const fetchLevel = await fetch(
      'https://openapi.programming-hero.com/api/levels/all'
   );
   const data = await fetchLevel.json();
   displayLesson(data.data);
};

// Load lesson words
const loadLevelWords = async (levelNo) => {
   console.log(levelNo);
   const fetchWords = await fetch(
      `https://openapi.programming-hero.com/api/level/${levelNo}`
   );
   const res = await fetchWords.json();
   displayLevelWords(res.data);
};

// Display lesson words
const displayLevelWords = (words) => {
   const wordsContainer = document.getElementById('lesson-words-container');
   wordsContainer.innerHTML = '';

   words.forEach((word) => {
      console.log(word);
      const cardDiv = document.createElement('div');
      cardDiv.classList = 'card bg-white py-10 px-10';
      cardDiv.innerHTML = `
         <div class="items-center text-center">
            <h2 class="text-3xl font-semibold mb-6">${word?.word}</h2>
            <p class="mb-6 text-xl">Meaning/Pronounsetion</p>
            <p class="siliguri-font text-3xl">"${word?.meaning} / ${word?.pronunciation}"</p>
            <div class="card-actions justify-between mt-8">
               <button class="btn bg-[#BADEFF]">
                  <i class="fa-solid fa-circle-info"></i>
               </button>
               <button class="btn bg-[#BADEFF]">
                  <i class="fa-solid fa-volume-high"></i>
               </button>
            </div>
         </div>
      `;
      wordsContainer.append(cardDiv);
   });
};

// Display levels
const displayLesson = (lessons) => {
   // console.log(lessons);
   const lessonBtnContainer = document.getElementById('lesson-btn-container');

   lessons.forEach((lesson) => {
      // console.log(lesson);
      const btnDiv = document.createElement('div');
      btnDiv.innerHTML = ` 
         <button onclick={loadLevelWords(${lesson?.level_no})} class="btn btn-outline btn-primary btn-sm">
            <i class="fa-solid fa-book-open"></i> Lesson -${lesson?.level_no}
         </button>
      `;

      lessonBtnContainer.append(btnDiv);
   });
};
lodeLevel();
