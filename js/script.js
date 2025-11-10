// Wait for DOM ready
$(function() {
  // set current year
  $('#year').text(new Date().getFullYear());

  // Smooth scroll for navbar links (uses browser's scroll-behavior too)
  $('a.nav-link').on('click', function(e){
    // default behavior is fine; but we collapse navbar on small screens
    $('.navbar-collapse').collapse('hide');
  });

  // Demo buttons: show toast with project title
  var toastEl = document.getElementById('demoToast');
  var toast = new bootstrap.Toast(toastEl, { delay: 2000 });

  $('.demo-btn').on('click', function(){
    var title = $(this).data('title') || 'Project';
    $('#demoToast .toast-body').text('Demo: ' + title + ' (placeholder)');
    toast.show();
  });

  // Simple jQuery form validation
  $('#contactForm').on('submit', function(e){
    e.preventDefault();
    var name = $('#name').val().trim();
    var email = $('#email').val().trim();
    var message = $('#message').val().trim();

    // Basic checks
    if(!name){
      alert('Please enter your name.');
      $('#name').focus();
      return;
    }
    // simple email regex (basic)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){
      alert('Please enter a valid email address.');
      $('#email').focus();
      return;
    }
    if(!message){
      alert('Please write a short message.');
      $('#message').focus();
      return;
    }

    // If OK, show a success toast and reset
    $('#demoToast .toast-body').text('Thanks, ' + name + '! Your message has been sent (demo).');
    toast.show();
    $(this)[0].reset();
  });

  // Optional: highlight nav item on scroll using Bootstrap scrollspy (already enabled via data attributes)
});
