import styled from '@emotion/styled'

export const DarkModeTogglerContainer = styled.div`
  #toggle_checkbox {
    display: none;
  }

  label {
    display: block;
    position: relative;
    width: 60px;
    height: 30px;
    margin: 0 auto;
    background-color: #77b5fe;
    border-radius: 56px;
    cursor: pointer;
    transition: 0.3s ease background-color;
    overflow: hidden;
  }

  #star {
    position: absolute;
    top: 8px;
    left: 10px;
    width: 15px;
    height: 15px;
    background-color: #fafd0f;
    transform: scale(1);
    border-radius: 50%;
    transition:
      0.3s ease top,
      0.3s ease left,
      0.3s ease transform,
      0.3s ease background-color;
    z-index: 1;
  }

  #star-1 {
    position: relative;
  }

  #star-2 {
    position: absolute;
    transform: rotateZ(36deg);
  }

  .star {
    user-select: none;
    top: 0;
    left: -3.5px;
    font-size: 27px;
    line-height: 14px;
    color: #fafd0f;
    transition: 0.3s ease color;
    font-family: 'Times New Roman';
  }

  #moon {
    position: absolute;
    bottom: -52px;
    right: 8px;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.3s ease bottom;
  }

  #moon:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -5px;
    width: 20px;
    height: 20px;
    background-color: #03a9f4;
    border-radius: 50%;
    transition: 0.3s ease background-color;
  }

  .dark && label {
    background-color: #000;
  }

  .dark && label #star {
    top: 2px;
    left: 30px;
    transform: scale(0.3);
    background-color: yellow;
  }

  .dark && label .star {
    color: yellow;
  }

  .dark && label #moon {
    bottom: 6px;
  }

  .dark && label #moon:before {
    background-color: #000;
  }
`
