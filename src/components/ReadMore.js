document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.team12_item').forEach(wrapper => {
    const textContent = wrapper.querySelector('.text-content');
    if (!textContent) return;
    const fullText = textContent.innerHTML;
    const maxLength = 225;

    if (fullText.length > maxLength) {
      const truncatedText = fullText.slice(0, maxLength) + '...';
      textContent.innerHTML = truncatedText;

      const readMoreButton = wrapper.querySelector('.read-more');
      let buttonText = readMoreButton ? readMoreButton.querySelector('.text-button') : null;
      if (!readMoreButton) return;
      if (!buttonText) buttonText = readMoreButton;

      readMoreButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (wrapper.classList.contains('expanded')) {
          textContent.innerHTML = truncatedText;
          textContent.classList.add('text-style-2lines');
          buttonText.textContent = 'weiterlesen ...';
          wrapper.classList.remove('expanded');
        } else {
          textContent.innerHTML = fullText;
          textContent.classList.remove('text-style-2lines');
          buttonText.textContent = 'schließen';
          wrapper.classList.add('expanded');
        }
      });
    }
  });
}); 