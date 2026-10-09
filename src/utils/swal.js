import Swal from 'sweetalert2';

// Custom dark trading terminal theme for SweetAlert2
const darkSwal = Swal.mixin({
  customClass: {
    popup: 'shipzo-swal',
    confirmButton: 'square-btn',
    cancelButton: 'square-btn'
  },
  buttonsStyling: false,
  background: '#0E1422',
  color: '#E2E8F0',
});

// Toast mixin for subtle notifications
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#0E1422',
  color: '#E2E8F0',
  customClass: {
    popup: 'shipzo-swal border border-[#1E293B]'
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// Helper functions
export const showSuccess = (title, text = '', timer = 2200) => {
  return darkSwal.fire({
    icon: 'success',
    title,
    text,
    timer,
    timerProgressBar: true,
    showConfirmButton: !timer,
    iconColor: '#10B981',
  });
};

export const showError = (title, text = '') => {
  return darkSwal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Understood',
    iconColor: '#EF4444',
  });
};

export const showWarning = (title, text = '') => {
  return darkSwal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'Proceed',
    iconColor: '#F59E0B',
  });
};

export const showConfirm = async (title, text = '', confirmButtonText = 'Confirm') => {
  return darkSwal.fire({
    title,
    text,
    icon: 'question',
    iconColor: '#06B6D4',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });
};

export default darkSwal;
