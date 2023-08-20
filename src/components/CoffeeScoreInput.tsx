import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const ScoreSlider = styled.input`
  width: 100%;
`;

interface CoffeeScoreInputProps {
  aspect: string;
  score: number;
  onChange: (value: number) => void;
}

const CoffeeScoreInput: React.FC<CoffeeScoreInputProps> = ({ aspect, score, onChange }) => {
  return (
    <InputContainer>
      <Label>{aspect}</Label>
      <ScoreSlider
        type="range"
        min="6"
        max="10"
        step="0.25"
        value={score}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span>{score}</span>
    </InputContainer>
  );
};

export default CoffeeScoreInput;
