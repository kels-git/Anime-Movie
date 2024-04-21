import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Style, useTailwind} from 'tailwind-rn';
import {useAppDimensions} from '../hooks/dimensions';
import {
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import ContainerWrapper from './wrapper/container-wrapper';
import {COLORS} from '../constants/colors';
import {MetricsSizes} from '../helper/variables';

export interface ResponsiveUiTextProps extends TextProps {
  // TEXT
  xl?: string | boolean;
  h1?: string | boolean;
  h2?: string | boolean;
  h3?: string | boolean;
  h4?: string | boolean;
  h5?: string | boolean;
  h6?: string | boolean;
  h7?: string | boolean;
  h8?: string | boolean;
  h9?: string | boolean;
  paragraph?: string | boolean;
  span?: string | boolean;
  subText?: string | boolean;
  fontSize?: number;
  // TEXT COLOR
  textWhite?: string | boolean;
  darkText?: string | boolean;
  color?: string | boolean;
  link?: string | boolean;
  // TEXT STYLE
  bold?: string | boolean;
  semiBold?: string | boolean;
  extraBold?: string | boolean;
  black?: string | boolean;
  regular?: string | boolean;
  italic?: string | boolean;
  light?: string | boolean;
  medium?: string | boolean;
  thin?: string | boolean;
  center?: string | boolean;
  ibmPlexSan?: string | boolean;
  // CUSTOM TAILWIND
  tailwind?: string;
  // UTILS
  postPreview?: boolean;
  containerStyle?: string;
}

export interface ResponsiveUiButtonProps extends ResponsiveUiTextProps {
  title: string;
  style?: {};
  titleStyle?: TextStyle;
  backgroundColor?: string;
  disabled?: boolean;
  gradient?: boolean;
  colors?: string[];
  loading?: boolean;
  titleColor?: string;
  action: () => void | undefined;
}

interface GradientTextProps extends ResponsiveUiTextProps {
  colors: string[];

  [x: string]: any;
}

const processTextStyles = (
  props: ResponsiveUiTextProps,
  tailwind: {(_classNames: string): Style},
  wp: any,
): TextStyle | any => {
  return {
    // DEFAULT COLOR AND FONT
    ...tailwind('text-text font-regular'),
    ...{fontSize: wp(3.8)},
    // FONT SIZE
    ...(props.xl && {fontSize: wp(7)}),
    ...(props.h1 && {fontSize: wp(6.5)}), //font-size: 24px;
    ...(props.h2 && {fontSize: wp(6)}), //font-size: 22px
    ...(props.h3 && {fontSize: wp(5.5)}), //font-size:20px,
    ...(props.h4 && {fontSize: wp(5)}), //font-size:18px
    ...(props.h5 && {fontSize: wp(4.5)}), //font-size: 16px;
    ...(props.h6 && {fontSize: wp(4)}), //font-size : 14px
    ...(props.h7 && {fontSize: wp(3.5)}), //font-size : 12px
    ...(props.h8 && {fontSize: wp(3)}), //font-size : 10px
    ...(props.h9 && {fontSize: wp(2.5)}), //font-size : 10px
    ...(props.paragraph && {fontSize: wp(3.5)}),
    ...(props.span && {fontSize: wp(3.2)}),
    ...(props.subText && {fontSize: wp(3), lineHeight: wp(4.5)}),
    ...(props.fontSize && {fontSize: props.fontSize}),
    // COLOR
    ...(props.textWhite && tailwind('text-white')),
    ...(props.darkText && tailwind('text-text-dark')),
    ...(props.link && tailwind('text-primary')),
    ...(props.color && {color: props.color}),
    // STYLE
    ...(props.bold && tailwind('font-bold')),
    ...(props.semiBold && tailwind('font-semiBold')),
    ...(props.extraBold && tailwind('font-extraBold')),
    ...(props.black && tailwind('font-black')),
    ...(props.regular && tailwind('font-regular')),
    ...(props.italic && tailwind('font-italic')),
    ...(props.thin && tailwind('font-thin')),
    ...(props.medium && tailwind('font-medium')),
    ...(props.light && tailwind('font-light')),
    ...(props.center && tailwind('text-center')),
    ...(props.ibmPlexSan && tailwind('font-ibmPlexSan')),
    ...(props.center && tailwind('font-testfont')),

    // CUSTOM TAILWIND
    ...(props.tailwind && tailwind(props.tailwind)),
  };
};

export const ResponsiveUi = {
  Text: (props: ResponsiveUiTextProps) => {
    const tailwind = useTailwind();
    const {wp} = useAppDimensions();

    return (
      <Text
        {...props}
        style={[processTextStyles(props, tailwind, wp), props.style]}>
        {props.children}
      </Text>
    );
  },

  Button: ({
    disabled,
    style,
    title,
    backgroundColor,
    gradient = false,
    loading,
    titleColor,
    action,
    colors = [],
    ...rest
  }: ResponsiveUiButtonProps) => {
    const tailwind = useTailwind();

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={disabled}
        onPress={() => {
          disabled ? null : action(), Keyboard.dismiss();
        }}
        style={[
          tailwind('items-center justify-center mb-2'),
          {
            shadowColor: COLORS.BLACK,
            shadowOffset: {height: 2},
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 2,
          },
          style,
          backgroundColor && backgroundColor,
          // disabled && tailwind('bg-gray-500'),
        ]}>
        <ContainerWrapper
          style={[tailwind('flex-row justify-center items-center'), {}]}>
          {gradient ? (
            <ResponsiveUi.GradientText center regular colors={colors} {...rest}>
              {loading ? (
                <ActivityIndicator
                  size={30}
                  color={COLORS.WHITE}
                  style={{margin: MetricsSizes.tiny - 3}}
                />
              ) : (
                <ResponsiveUi.Text
                  tailwind="font-bold"
                  color={titleColor}
                  style={tailwind('')}
                  {...rest}>
                  {title}
                </ResponsiveUi.Text>
              )}
            </ResponsiveUi.GradientText>
          ) : (
            <ResponsiveUi.Text
              color={titleColor}
              center
              {...rest}
              tailwind="font-bold">
              {title}
            </ResponsiveUi.Text>
          )}
        </ContainerWrapper>
      </TouchableOpacity>
    );
  },

  GradientText: ({colors, ...rest}: GradientTextProps) => {
    const tailwind = useTailwind();
    return (
      <LinearGradient
        colors={colors}
        style={[
          tailwind('w-full h-12 items-center justify-center rounded-full'),
        ]}>
        <ResponsiveUi.Text
          {...rest}
          style={[rest.style, tailwind('text-white')]}
          tailwind="font-bold">
          {rest.children}
        </ResponsiveUi.Text>
      </LinearGradient>
    );
  },
};
