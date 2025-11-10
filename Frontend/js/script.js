// Wait for DOM ready
$(function() {
  $('#year').text(new Date().getFullYear());

  // collapse nav on link click
  $('a.nav-link').on('click', function(){ $('.navbar-collapse').collapse('hide'); });

  // demo buttons (same)
  var toastEl = document.getElementById('demoToast');
  var toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  $('.demo-btn').on('click', function(){
    var title = $(this).data('title') || 'Project';
    $('#demoToast .toast-body').text('Demo: ' + title + ' (placeholder)');
    toast.show();
  });

  // REAL form submission to backend
  $('#contactForm').on('submit', function(e){
    e.preventDefault();
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();

    if(!name){ alert('Please enter your name.'); $('#name').focus(); return; }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){ alert('Please enter a valid email address.'); $('#email').focus(); return; }
    if(!message){ alert('Please write a short message.'); $('#message').focus(); return; }

    // POST to backend API (change URL if deploying)
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        $('#demoToast .toast-body').text('Thanks, ' + name + '! Message received.');
        toast.show();
        $('#contactForm')[0].reset();
      } else {
        alert('Error: ' + (data.error || 'Unknown error'));
      }
    })
    .catch(err => {
      console.error(err);
      alert('Could not send message. Try again later.');
    });
  });
});
