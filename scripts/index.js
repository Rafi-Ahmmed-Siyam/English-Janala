console.log('Hello this is english janala');
// Create html element with array
const createElements = (arr) => {
   // const arr = ['siyam', 'sihab', 'sami'];
   const htmlElements = arr.map(
      (name) => `<div
            class="badge bg-[#EDF7FF] border border-[#D7E4EF] rounded-md px-5 py-4"
         >
            ${name}
         </div>`
   );
   return htmlElements.join('');
};

// Load levels Number
const lodeLevel = async () => {
   const fetchLevel = await fetch(
      'https://openapi.programming-hero.com/api/levels/all'
   );
   const data = await fetchLevel.json();
   displayLesson(data.data);
};
lodeLevel();
// Load level words
const loadLevelWords = async (levelNo) => {
   manageSpinner(true);
   const fetchWords = await fetch(
      `https://openapi.programming-hero.com/api/level/${levelNo}`
   );
   const res = await fetchWords.json();
   const clickedBtn = document.getElementById(`level-btn-${levelNo}`);
   removeActive();
   clickedBtn.classList.add('active');
   // console.log(clickedBtn);
   displayLevelWords(res.data);
};

// Load word Details
const loadDetails = async (id) => {
   const loadWordDetails = await fetch(
      `https://openapi.programming-hero.com/api/word/${id}`
   );
   const data = await loadWordDetails.json();
   // console.log(data.data);
   showDetails(data.data);
};

// Display level words
const displayLevelWords = (words) => {
   const wordsContainer = document.getElementById('lesson-words-container');
   wordsContainer.innerHTML = '';

   if (words.length == 0) {
      const errorDiv = document.createElement('div');
      errorDiv.classList = 'col-span-full';
      errorDiv.innerHTML = `
      <div class="flex justify-center items-center">
         <div>
            <img src="./assets/alert-error.png" class="w-24 mx-auto" alt="" />
            <p class="text-center">
               এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h3 class="text-center text-3xl font-semibold">নেক্সট Lesson এ যান</h3>
         </div>
      </div>
         
      `;
      manageSpinner(false);
      return wordsContainer.append(errorDiv);
   }

   words.forEach((word) => {
      // console.log(word);
      const cardDiv = document.createElement('div');
      cardDiv.classList = 'card bg-white py-10 px-10 h-full';
      cardDiv.innerHTML = `
         <div class="items-center text-center ">
            <h2 class="text-3xl font-semibold mb-6">${word?.word}</h2>
            <p class="mb-6 text-xl">Meaning/Pronounsetion</p>
            <p class="siliguri-font text-2xl">"${word?.meaning || 'অর্থ পাওয়া যায় নি'} / ${word?.pronunciation || 'pronunciation পাওয়া যায় নি'}"</p>
            <div class="card-actions justify-between mt-8">
               <button onclick="loadDetails(${word?.id})" class="btn bg-[#BADEFF]">
                  <i class="fa-solid fa-circle-info"></i>
               </button>
               <button onclick="speakWord('${word.word}')" class="btn bg-[#BADEFF]">
                  <i class="fa-solid fa-volume-high"></i>
               </button>
            </div>
         </div>
      `;
      wordsContainer.append(cardDiv);
   });
   manageSpinner(false);
};

// Display details in modal
const showDetails = (details) => {
   console.log(details);
   const modalContainer = document.getElementById('modal-container');
   modalContainer.innerHTML = '';
   const div = document.createElement('div');
   div.classList = 'border border-[#EDF7FF] rounded-xl p-6';
   div.innerHTML = `
      <h3 class="text-xl font-bold">
                  ${details?.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details?.pronunciation})
      </h3>
      <p class="py-4 text-md font-semibold text-black">Meaning</p>
      <p class="text-md font-medium siliguri-font">${details?.meaning}</p>
      <p class="text-md font-medium pt-4 text-black">Example</p>
      <p class="text-md pt-4 text-gray-600">
         ${details?.sentence}
      </p>
      <p class="text-md font-medium siliguri-font pt-5">
         সমার্থক শব্দ গুলো
      </p>
      <div id='badge-div' class="mt-3 flex justify-start items-center gap-1">
        
          
         ${createElements(details?.synonyms)}
         
      </div>
      <div class="modal-action justify-start">
         <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-[#422AD5] text-white">
               Complete Learning
            </button>
         </form>
      </div>
   `;
   modalContainer.append(div);
   my_modal_1.showModal();
};

// Display levels
const displayLesson = (lessons) => {
   // console.log(lessons);
   const lessonBtnContainer = document.getElementById('lesson-btn-container');

   lessons.forEach((lesson) => {
      // console.log(lesson);
      const btnDiv = document.createElement('div');
      btnDiv.innerHTML = ` 
         <button id="level-btn-${lesson?.level_no}" onclick={loadLevelWords(${lesson?.level_no})} class="btn btn-outline btn-sm lesson-btn ">
            <i class="fa-solid fa-book-open"></i> Lesson -${lesson?.level_no}
         </button>
      `;

      lessonBtnContainer.append(btnDiv);
   });
};

// Remove active class from  lesson button
const removeActive = () => {
   const lessonBtns = document.querySelectorAll('.lesson-btn');

   lessonBtns.forEach((btn) => {
      // console.log(btn);
      btn.classList.remove('active');
   });
};

const manageSpinner = (status) => {
   const wordsDiv = document.getElementById('lesson-main-container');
   const spinner = document.getElementById('spinner');
   if (status === true) {
      spinner.classList.remove('hidden');
      wordsDiv.classList.add('hidden');
   } else {
      spinner.classList.add('hidden');
      wordsDiv.classList.remove('hidden');
   }
};

// Search functionality
document.getElementById('search-btn').addEventListener('click', async () => {
   removeActive();
   manageSpinner(true);
   const searchInput = document.getElementById('search-input');
   const searchValue = searchInput.value.toLowerCase().trim();
   console.log(searchValue);

   const fetchAllWord = await fetch(
      'https://openapi.programming-hero.com/api/words/all#'
   );
   const { data } = await fetchAllWord.json();

   const filterWords = data.filter((word) =>
      word.word.toLowerCase().includes(searchValue)
   );

   const wordsContainer = document.getElementById('lesson-words-container');
   wordsContainer.innerHTML = '';
   if (filterWords.length === 0) {
      const errorDiv = document.createElement('div');
      errorDiv.classList = 'col-span-full';
      errorDiv.innerHTML = `
      <div class="flex justify-center items-center">
         <div>
            <img src="./assets/alert-error.png" class="w-24 mx-auto" alt="" />
            <p class="text-center">
               শব্দটি vocabulary-তে যুক্ত করা হয়নি।
            </p>
            <h3 class="text-center text-3xl font-semibold">ভিন্ন শব্দ অনুসন্ধান করুন।</h3>
         </div>
      </div>
         
      `;
      manageSpinner(false);
      return wordsContainer.append(errorDiv);
   }
   manageSpinner(false);
   displayLevelWords(filterWords);
});

// Speak word
const speakWord = (word) => {
   const utterance = new SpeechSynthesisUtterance(word);
   utterance.lang = 'en-EN'; // English
   window.speechSynthesis.speak(utterance);
};
