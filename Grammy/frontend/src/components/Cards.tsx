"use client";
import React from "react";
import {
  CardContainer,
  Image,
  Title,
  Subtitle,
  Year,
  Icon,
} from "../styles/CardStyles";

interface CardProps {
  name: string;
  subtitle: string;
  year: number;
  image: string;
  icon: string;
}

export default function Card({ name, subtitle, year, image, icon }: CardProps) {
  return (
    <CardContainer>
      <Image src={image} alt={name} />
      <Icon src={icon} alt="Logo" />
      <Title>{name}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Year>{year}</Year>
    </CardContainer>
  );
}
