import { HTMLAttributes, SetStateAction } from 'react';
import { IconType } from 'react-icons/lib';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Token } from 'react-stripe-checkout';

export type Announcements = {
  id: number;
  title: string;
}[];

interface UserDetailType {
  active: boolean;
  country?: string;
  createdAt: string;
  email: string;
  fromFacebook: boolean;
  fromGoogle: boolean;
  image?: string;
  name: string;
  token: string;
  updatedAt: string;
  username: string;
  phone?: number;
  __v: number;
  _id: string;
}

export interface CurrentUserType {
  status: string;
  details: UserDetailType;
  role: 'admin' | 'user';
}

export interface AuthStore {
  user: CurrentUserType;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface AuthActionType {
  reset(): void;
  facebookLoginPending(): void;
  facebookLoginFulfilled(payload: CurrentUserType): void;
  facebookLoginRejected(payload: string): void;
  loginUserPending(): void;
  loginUserFulfilled(payload: CurrentUserType): void;
  loginUserRejected(payload: string): void;
  googleLoginPending(): void;
  googleLoginFulfilled(payload: CurrentUserType): void;
  googleLoginRejected(payload: string): void;
  registerUserPending(): void;
  registerUserFulfilled(payload: CurrentUserType): void;
  registerUserRejected(payload: string): void;
  logoutUser(): void;
  updateUserDataPending(): void;
  updateUserDataFulfilled(payload: CurrentUserType): void;
  updateUserDataRejected(payload: string): void;
  updateUserEmailPending(): void;
  updateUserEmailFulfilled(payload: CurrentUserType): void;
  updateUserEmailRejected(payload: string): void;
  updateUserPasswordPending(): void;
  updateUserPasswordFulfilled(payload: CurrentUserType): void;
  updateUserPasswordRejected(payload: string): void;
  deleteUserPending(): void;
  deleteUserFulfilled(): void;
  deleteUserRejected(payload: string): void;
}

export type CartItem = {
  id: string;
  name: string;
  images: string[];
  color: string;
  size: string | number;
  price: number;
  inCart: boolean;
  quantity: number;
}[];

export type ProductValues = {
  id: string;
  category: string;
  color: string | string[];
  desc: string;
  discount: number;
  featured: boolean;
  images: string[];
  inStock: boolean;
  name: string;
  numberInStock: number;
  price: number;
  priceDiscount: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  size: string | string[];
  likes: string[];
  views: number;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type CartValues = {
  id: string;
  category: string;
  color: string | string[];
  desc: string;
  discount: number;
  featured: boolean;
  images: string[];
  inStock: boolean;
  name: string;
  numberInStock: number;
  price: number;
  priceDiscount: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  size: string | string[];
  likes: string[];
  views: number;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type WishlistValues = {
  id: string;
  category: string;
  color: string | string[];
  desc: string;
  discount: number;
  featured: boolean;
  images: string[];
  inStock: boolean;
  name: string;
  numberInStock: number;
  price: number;
  priceDiscount: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  size: string | string[];
  likes: string[];
  views: number;
  slug: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type WishedValue = {
  id: number;
};

export interface CartStore {
  cart: CartValues[];
  wishlists: WishlistValues[];
  wished: string[];
  qty: number;
  tax: number;
  total: number;
  subtotal: number;
}

export interface CartActionType {
  reset(): void;
  addProduct(payload: CartValues): void;
  addWishlist(payload: WishlistValues): void;
  removeWishlist(id: string): void;
  clearCart(): void;
  remove(id: string): void;
  toggleQuantity(payload: { type: string; id: string }): void;
  calcTotals(): void;
}

export interface ICartControls {
  (productId: string): {
    inCart: boolean | undefined;
    actionLabel: string;
  };
}

export interface SearchStore {
  products: ProductValues[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

export interface SearchActionType {
  reset(): void;
  searchProductPending(): void;
  searchProductFulfilled(products: ProductValues[]): void;
  searchProductFailure(payload: string): void;
}

export type IHistory = {
  id: string;
  query: string;
};

export type IHistories = IHistory[];

export type NavLink = {
  id: number;
  text: string;
}[];

type Link = {
  url: string;
  icon: IconDefinition;
  label: string;
}[];

export type Sublink = {
  page: string;
  links: Link;
}[];

export type SliderItem = {
  id: number;
  url: string;
  img: string;
  title: string;
  desc: string;
}[];

export interface SliderItemProps {
  url: string;
  img: string;
  desc: string;
  title: string;
  index: number;
  position: string;
}

export type ActiveButtonProps = {
  items: SliderItem;
  slideNumber: number;
  setSlideNumber(value: number): void;
};

export type SliderButtonProps = {
  icon: IconDefinition;
  direction: string;
  onClick(): void;
};

export type CategoryImage = string[];

type LinkFooter = {
  id: number;
  url: string;
  text: string;
};

export type FooterMenu = {
  title: string;
  links: LinkFooter[];
}[];

export type Social = {
  id: number;
  url: string;
  icon: IconType;
  color: string;
}[];

export type FooterLink = {
  id: number;
  url: string;
  text: string;
}[];

export type StoreProduct = {
  id: number;
  name: string;
  desc: string;
  price: number;
  priceDiscount: number;
  numberInStock: number;
  inStock: boolean;
  images: string[];
  featured: boolean;
  color: string[];
  size: string[];
  likes: string[];
  category: string;
  tags: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  discount: number;
}[];

export interface ProductType {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceDiscount: number;
  numberInStock: number;
  inStock: boolean;
  images: string[];
  featured: boolean;
  color: string[];
  size: string[];
  likes: string[];
  views: number;
  category: string;
  tags: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  reviews: object[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  discount: number;
}

export interface SlideProps {
  slidesToShow: number;
  children: React.ReactNode;
}

type CategoryType = {
  category: string;
  count: number;
}[];

export interface CategoryProps {
  data: CategoryType;
  src: string;
  index: number;
}

export type TopReview = {
  id: number;
  rating: number;
  review: string;
  user: {
    name: string;
    photo: string;
  };
}[];

export type ReviewItem = {
  id: string;
  user: {
    name: string;
    image?: string;
  };
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}[];

export interface ReviewContentProps {
  rating: number;
  review: string;
  reviewer?: string;
  totalReviews: number;
}

export interface ReviewInfoProps {
  review: string;
  reviewer?: string;
}

export type WishlistItem = {
  id: number;
  name: string;
  desc: string;
  price: number;
  numberInStock: number;
  inStock: boolean;
  images: string[];
  featured: boolean;
  color: string[];
  size: string[];
  category: string;
  tags: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
};

export type WishlistItems = WishlistItem[];

export type OrderItem = {
  id: number;
  customer: string;
  address: string;
  total: number;
  status: number;
  paymentMethod: number;
  user: string;
  createdAt: string;
  updatedAt: string;
}[];

export type RecommendationType = {
  id: string;
  name: string;
  price: number;
  images: string[];
}[];

export type ProductValue = {
  id: number;
  desc: string;
  img: string;
  src: string;
}[];

export type PriceOption = {
  value: string;
  text: string;
}[];

type RegisterInputType = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
}[];

export type RegisterInput = RegisterInputType;

export type PasswordInput = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
}[];

export type UserDataInput = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
}[];

export type SelectInput = {
  id: string;
  name: string;
  label: string;
}[];

export type Submenu = {
  page: string | null;
  coordinates: {
    center: number;
    bottom: number;
  };
};

export type OpenSubmenu = {
  isOpen: boolean;
  location: {
    center?: number;
    bottom?: number;
  };
  page?: {
    page: string;
    links: Link;
  };
};

export interface SubmenuStore {
  isOpen: boolean;
  location: {
    center?: number;
    bottom?: number;
  };
  page: {
    page: string;
    links: Link;
  };
}

export interface SubmenuActionType {
  openSubmenu(value: Submenu): void;
  closeSubmenu(): void;
}

export type CountryValues = {
  flag: string;
  label: string;
}[];

export interface CountrySelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data: CountryValues;
  name: string;
  label: string;
  value: string | number | readonly string[];
  error?: string;
  onChange(event: React.ChangeEvent<HTMLSelectElement> | undefined): void;
}

export type WishlistProps = {
  (
    actionId: string,
    product: WishlistValues,
    wished: string[],
    currentUser: CurrentUserType
  ): {
    isWished: boolean;
    handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
};

export interface IFavorite {
  (
    actionId: string,
    currentUser: CurrentUserType,
    likes: string[],
    onUpdate?: React.Dispatch<SetStateAction<ProductValues[]>>,
    onFavorite?: () => void
  ): {
    hasFavorited: boolean;
    toggleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  };
}

export interface MenuItemProps {
  label: string;
  onMouse(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface LoginButtonProps {
  isHover: boolean;
  onMouseOver(): void;
  onMouseLeave(): void;
}

export interface CartQuantityProps {
  amount: number;
}

export interface SearchIconProps {
  onOpen(): void;
}

export interface ToggleButtonProps {
  icon: IconDefinition;
  onClick(): void;
}

export interface SidebarMenuProps {
  items: Sublink;
  onAction(e: React.MouseEvent<HTMLButtonElement>): void;
  onClose(): void;
  currentUser: CurrentUserType;
}

export interface SidebarMenuItemProps {
  url: string;
  icon: IconDefinition;
  label: string;
  onClose(): void;
}

export interface SidebarSearch {
  query: string;
  loading: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export interface SubmenuMenuItemProps {
  url: string;
  icon: IconDefinition;
  label: string;
  onClose(): void;
}

export interface ProductListProps {
  products: ProductValues[];
  onUpdate: React.Dispatch<SetStateAction<ProductValues[] | ProductType[]>>;
}

export interface ProductCardProps {
  currentUser: CurrentUserType;
  product: CardProduct;
  onOpen(): void;
  onSelect(value: WishlistValues): void;
  onUpdate: React.Dispatch<SetStateAction<ProductValues[] | ProductType[]>>;
}

interface CardProduct {
  id: string;
  name: string;
  desc: string;
  price: number;
  priceDiscount: number;
  numberInStock: number;
  inStock: boolean;
  images: string[];
  featured: boolean;
  color: string | string[];
  size: string | string[];
  likes: string[];
  views: number;
  category: string;
  tags: string[];
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  discount: number;
}

export interface CardInfoProps {
  url: string;
  currentUser: CurrentUserType;
  product: CardProduct;
  initialPrice: number;
  priceLabel: number;
  reviewLabel: string;
  wished: string[];
  onOpen(): void;
  onUpdate: React.Dispatch<SetStateAction<ProductValues[]>>;
}

export interface CardHeadingProps {
  url: string;
  name: string;
}

export interface CardReviewProps {
  reviewLabel: string;
  ratingsAverage: number;
  ratingsQuantity: number;
}

export interface CardPriceProps {
  inStock: boolean;
  initialPrice: number;
  priceLabel: number;
}

export interface CardButtonProps {
  actionId: string;
  onAction(): void;
}

export interface CardButtonsProps {
  currentUser: CurrentUserType;
  product: CardProduct;
  productId: string;
  wished: string[];
  onUpdate: React.Dispatch<SetStateAction<ProductValues[]>>;
}

export interface WishlistButtonProps {
  actionId: string;
  product: WishlistValues;
  wished: string[];
  currentUser: CurrentUserType;
}

export interface WishProductProps {
  actionId: string;
  product: WishlistValues;
  currentUser: CurrentUserType;
}

export interface HeartIconProps {
  isWished: boolean;
  currentUser: CurrentUserType;
}

export interface FavoriteButtonProps {
  actionId: string;
  likes: string[];
  currentUser: CurrentUserType;
  onUpdate?: React.Dispatch<SetStateAction<ProductValues[]>>;
}

export interface FavoriteProductProps {
  actionId: string;
  currentUser: CurrentUserType;
  likes: string[];
  onFavorite(): void;
}

export interface CartModalProps {
  product?: ProductValues;
  isOpen: boolean;
  type?: string;
  onClose(): void;
  onSelect: React.Dispatch<SetStateAction<WishlistValues | undefined>>;
}

export interface ReviewType {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: ReviewerType;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewerType {
  _id: string;
  name: string;
  image: string;
}

export interface ReviewItemProps {
  _id: string;
  rating: number;
  review: string;
  user: ReviewerType;
}

export interface FooterMenuItemsProps {
  data: FooterMenu;
}

export interface FooterMenuItemProps {
  data: FooterLink;
}

export interface FooterHeadingProps {
  title: string;
  small?: boolean;
}

export interface SocialIconProps {
  data: Social;
}

export interface FooterLinkProps {
  data: FooterLink;
}

export interface ProductProps {
  product: ProductValues | CartValues;
  inCart: boolean | undefined;
  actionLabel: string;
  currentUser: CurrentUserType;
  onFavorite(): void;
}

export interface ProductImageProps {
  image: string;
  index: number;
  onOpen(index: number): void;
}

export interface ProductImageModalProps {
  images: string[];
  isOpen: boolean;
  isMoved: boolean;
  slideIndex: number;
  lastIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  onMove(direction: string): void;
  onClose(): void;
}

export interface ProductHeadProps {
  name?: string;
  price?: number;
  modal?: boolean;
  discount?: number;
  priceDiscount?: number;
  ratingsAverage?: number | null;
  ratingsQuantity?: number | null;
}

export interface ColorSelectProps {
  title: string;
  mode?: string;
  value: string | string[];
  modal?: boolean;
  selected?: string | null;
  onAction(value: string): void;
  secondaryAction: React.Dispatch<SetStateAction<string | null>>;
}

export interface SizeSelectProps {
  value: string | string[];
  title?: string;
  modal?: boolean;
  selected?: string | null;
  onAction(value: string): void;
  secondaryAction: React.Dispatch<SetStateAction<string | null>>;
}

export interface CounterProps {
  value: number;
  title: string;
  modal?: boolean;
  onClick(value: number): void;
}

export interface ProductButtonProps {
  small?: boolean;
  actionLabel: string;
  inCart: boolean | undefined;
  onAction(): void;
}

export interface AlertProps {
  alert: boolean;
  center?: boolean;
  message: string;
  onChange(alert: boolean): void;
}

export interface ProductButtonsProps {
  actionId: string;
  alert: boolean;
  currentUser: CurrentUserType;
  product: WishlistValues;
  likes: string[];
  onFavorite(): void;
}

export interface ProductValueProps {
  items: ProductValue;
  mode: boolean;
}

export interface RecommendationsProps {
  data: RecommendationType;
  productId?: string;
}

export interface RecommendationProps {
  id: string;
  name: string;
  price: number;
  images: string[];
}

export interface ReviewsProps {
  productId?: string;
  reviews: ReviewItem;
  ratingsAverage: number;
  ratingsQuantity: number;
  sortLabel?: 'latest' | 'highest rating' | 'lowest rating';
  sort: string | null;
  onSort: React.Dispatch<SetStateAction<string>>;
  onReviews(value: React.SetStateAction<ReviewItem>): void;
  onRefetch(): void;
}

export interface ReviewHeadProps {
  sort: string | null;
  sortLabel?: 'latest' | 'highest rating' | 'lowest rating';
  ratingsAverage: number;
  reviews: ReviewItem;
  isOpen: boolean;
  onOpen(): void;
  onSort: React.Dispatch<SetStateAction<string>>;
  onToggle(): void;
}

export interface ReviewButtonProps {
  actionLabel: string;
  onAction(): void;
}

export interface ReviewCardsProps {
  ratingsAverage: number;
  ratingsQuantity: number;
  reviews: ReviewItem;
  onOpen(): void;
}

export interface ReviewCardProps {
  id: string;
  user: {
    name: string;
    image?: string;
  };
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewErrors {
  review?: string;
  rating?: string;
}

export interface ReviewModalProps {
  productId?: string;
  isOpen: boolean;
  onClose(): void;
  onReviews(value: React.SetStateAction<ReviewItem>): void;
  onRefetch(): void;
}

export interface ReviewFormProps {
  rating: number | null;
  review: string;
  terms: boolean;
  errors: ReviewErrors;
  isLoading: boolean;
  onChangeRating: React.Dispatch<React.SetStateAction<number | null>>;
  onChangeReview(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  onChangeTerms(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export interface EmptyReviewProps {
  title?: string;
  label?: string;
  ratingsAverage: number;
  onClick(): void;
}

export interface ReviewFilterProps {
  sort: string | null;
  value?: 'latest' | 'highest rating' | 'lowest rating';
  isOpen: boolean;
  onClick(): void;
  onSort: React.Dispatch<SetStateAction<string>>;
}

export interface DeleteModalProps {
  actionId?: string;
  wishlistLabel: 'wishlists' | 'wishlist';
  isOpen: boolean;
  onAction(id: string): void;
  onClose(): void;
}

export interface CartItemProps {
  id: string;
  name: string;
  size: string | string[];
  color: string | string[];
  images: string[];
  price: number;
  quantity: number;
}

export interface CartInfoProps {
  id: string;
  color: string | string[];
  name: string;
  image: string;
  price: number;
  size: string | string[];
  onAction(id: string): void;
}

export interface CartCounterProps {
  value: number;
  onIncrement(type: string): void;
  onDecrement(type: string): void;
}

export interface CartTotalProps {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  onAction(): void;
}

export interface CheckoutButtonProps {
  email: string;
  total: number;
  stripeKey: string;
  onToken(token: Token): void;
}

export interface PaymentModalProps {
  isOpen: boolean;
  onClose(): void;
  onExit(): void;
}

export interface OrderDetailsProps {
  name: string;
  address: string;
  total: number;
  isLoading: boolean;
  errors: {
    name?: string;
    address?: string;
  };
  onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export interface ProductFilterProps {
  products: ProductValues[];
  price: number;
  category: string;
  size: string;
  color: string;
  minPrice: number;
  maxPrice: number;
  onChangeColor(e: React.ChangeEvent<HTMLSelectElement>): void;
  onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>): void;
  onChangeSize(e: React.ChangeEvent<HTMLSelectElement>): void;
  onChangePrice(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface FilterSelect
  extends React.HTMLAttributes<HTMLSelectElement | HTMLInputElement> {
  name: string;
  value?: string | number | readonly string[];
  page?: string;
  label: string;
  options: React.ReactNode[];
}

export interface SelectPriceProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string | number | readonly string[];
  label: string;
  options: PriceOption;
}

export interface RangeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string | number | readonly string[];
  min?: string | number;
  max?: string | number;
  price: number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface PagerProps {
  page: number;
  counts: number;
  numberOfPages: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginationUrl(page: number): string;
  onAction: React.Dispatch<React.SetStateAction<number>>;
}

export interface OrderType {
  _id: string;
  address: string;
  customer: string;
  paymentMethod: number;
  products: object[];
  status: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  user: string;
  __v: number;
}

export interface OrderCardProps {
  _id: string;
  total: number;
  status: number;
  createdAt: string;
}

export interface DateTimeProps {
  date: string | Date;
  type?: string;
}

export interface WishlistCardProps {
  isOpen: boolean;
  onOpen(id: string): void;
  selected: string | undefined;
  wishlists: WishlistValues[];
  wishlistLabel: 'wishlists' | 'wishlist';
  onAction(wishlist: WishlistValues): void;
  onClose(): void;
  onDelete(id: string): void;
}

export interface WishlistInfoProps {
  id: string;
  desc: string;
  name: string;
  image: string;
  excerpts(str: string, count: number): string;
}

export interface WislistPriceProps {
  price: number;
  wishlist: WishlistValues;
  onAction(wishlist: React.SetStateAction<object>): void;
}

export interface CloseButtonProps {
  id: string;
  onOpen(id: string): void;
}

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  label: string;
  value: string | number | readonly string[];
  placeholder: string;
  error?: string;
  small?: boolean;
}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  value: string | number | readonly string[];
  placeholder?: string;
  error?: string;
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data: CategoryValues[];
  name: string;
  label: string;
  value: string | number | readonly string[];
  error?: string;
  defaultText: string;
  loading?: boolean;
}

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  checked: boolean;
}

export interface FormUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  accept: string;
}

export interface FormButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface FormProps {
  type?: string;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export interface FormHeadingProps {
  small: boolean;
  type?: string;
  title: string;
}

interface AccountModal {
  onOpen(): void;
}

interface EmailModal {
  onOpen(): void;
}

interface FileModal {
  onOpen(): void;
}

interface PasswordModal {
  onOpen(): void;
}

export interface AccountInfoProps {
  avatar?: string;
  user: CurrentUserType;
  accountModal: AccountModal;
  emailModal: EmailModal;
  fileModal: FileModal;
  passwordModal: PasswordModal;
}

export interface AccountHeadProps {
  currentUser: CurrentUserType;
  onOpen(): void;
  onAction(): void;
}

export interface AccountUploadProps {
  avatar?: string;
  onOpen(): void;
}

export interface AccountInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: string;
  label: string;
  value?: string | number | readonly string[];
  placeholder?: string;
  error?: string;
}

export interface AccountButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface CancelButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick(): void;
}

export interface UpdateDataProps {
  email: string;
  onCancel(): void;
}

export interface ModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose(): void;
}

export interface OverlayProps {
  type: string;
  mode: string;
  children: React.ReactNode;
  onClick(e: React.MouseEvent<HTMLDivElement>): void;
}

export interface SearchHistoryProps {
  id: string;
  query: string;
  onClose(): void;
  onDelete(id: string): void;
}

export type OrderStatusType = {
  id: number;
  icon: string;
  src: string;
  text: string;
  status: number;
}[];

export interface OrderStatusItemProps {
  id: number;
  icon: string;
  src: string;
  text: string;
  status: number;
  statusClass(index: number): 'done' | 'inProgress' | 'undone' | undefined;
  mode: string;
}

export interface OrderTableProps {
  order: OrderType;
}

export type ColumnType = {
  path: string;
  label: string;
}[];

export interface TableProps {
  columns: ColumnType;
  data: OrderType;
}

export interface TableBodyProps {
  _id: string;
  address: string;
  customer: string;
  total: number;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface RegisterErrors {
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
}

export interface ForgotErrors {
  email?: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
}

export interface UpdateUserData {
  email: string;
  password: string;
}

export interface UpdateDataErrors {
  email?: string;
  password?: string;
}

export interface UpdatePasswordData {
  password: string;
  confirmPassword: string;
  currentPassword: string;
}

export interface UpdatePasswordErrors {
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
}

export interface ProductData {
  name: string;
  desc: string;
  price: number;
  priceDiscount: number;
  numberInStock: number;
  category: string;
}

export interface ProductErrors {
  name?: string;
  desc?: string;
  price?: string;
  priceDiscount?: string;
  numberInStock?: string;
  category?: string;
  tags?: string;
}

export interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

export interface CategoryValues {
  _id: string;
  name: string;
  parent?: string;
  properties: [];
  createdAt: string;
  updatedAt: string;
}

export interface StarRatingProps {
  name: 'read-only' | 'hover-feedback' | 'disabled' | 'no-value';
  value: number | null | undefined;
  readOnly?: boolean;
  onChange?:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: number | null
      ) => void)
    | undefined;
}

export interface ProductInfoProps {
  name: string;
  desc: string;
  price: number;
  priceDiscount: number;
  numberInStock: number;
  errors: ProductErrors;
  onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void;
}

export interface ProductImagesProps {
  color: string[];
  size: string[];
  category: string;
  categories: CategoryValues[];
  tags: string[];
  errors: ProductErrors;
  loading: boolean;
  progress: number;
  labelClasses: string;
  onChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void;
  onChangeColor(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeSize(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeTags(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeFiles(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface SlideButtonsProps {
  disabled?: boolean;
  isNextBtn: boolean;
  isPrevBtn: boolean;
  onNext(e: React.MouseEvent<HTMLButtonElement>): void;
  onPrev(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface SlideButtonProps {
  label: string;
  show: boolean;
  disabled?: boolean;
  onAction(e: React.MouseEvent<HTMLButtonElement>): void;
}

export interface RegisterInfoProps {
  data: RegisterData;
  errors: RegisterErrors;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface RegisterPasswordProps {
  data: RegisterData;
  percentage: number;
  errors: RegisterErrors;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeCountry(event: React.ChangeEvent<HTMLSelectElement>): void;
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>): void;
}

export interface PaymentData {
  name: string;
  address: string;
}

export interface PaymentErrors {
  name?: string;
  address?: string;
}

export interface EmptyStateProps {
  src?: string;
  title?: string;
}

export interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  title?: string;
}
