import Notiflix from 'notiflix';
const submit = document.querySelector('button[type="submit"] ');
const form = document.querySelector('.form');
let formData = {};

form.addEventListener('input', dataCrawler);

function dataCrawler(e) {
  const input = e.target;
  if (input.hasAttribute('name')) {
    formData[input.getAttribute('name')] = parseInt(input.value, 10);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  let delay = formData.delay;
  let step = formData.step;
  let amount = formData.amount;
  let position = 0;

  for (let i = 0; i < amount; i++) {
    position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
    form.reset();
  }
}
