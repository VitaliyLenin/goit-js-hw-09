import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('click', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay: firstDelay, step, amount },
  } = e.currentTarget;

  for (let i = 0; i < amount.value; i += 1) {
    let position = i + 1;
    let delay = Number(firstDelay.value) + Number(step.value) * i;

    createPromise(position, delay)
      .then(result => {
        result;
      })
      .catch(result => {
        result;
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
        );
      } else {
        reject(
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
        );
      }
    }, delay);
  });
}
