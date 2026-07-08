<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StoryResource\Pages;
use App\Models\Story;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class StoryResource extends Resource
{
    protected static ?string $model = Story::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $navigationLabel = 'Explore Stories';

    protected static ?string $navigationGroup = 'Explore';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Info')
                    ->schema([
                        Forms\Components\Select::make('type')
                            ->options([
                                'recipes' => 'Recipes',
                                'media'   => 'Media',
                            ])
                            ->required()
                            ->live()
                            ->columnSpan(1),

                        Forms\Components\Select::make('status')
                            ->options([
                                'draft'     => 'Draft',
                                'published' => 'Published',
                            ])
                            ->default('draft')
                            ->required()
                            ->columnSpan(1),

                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Set $set, ?string $state) {
                                $set('slug', Str::slug($state));
                            })
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Forms\Components\RichEditor::make('excerpt')
                            ->label('Excerpt')
                            ->required()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'bulletList',
                                'orderedList',
                                'link',
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Cover Image')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->disk('public')
                            ->directory('stories')
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->columnSpanFull(),
                    ])
                    ->visible(fn (Get $get) => $get('type') === 'recipes'),

                Forms\Components\Section::make('Content')
                    ->schema([
                        Forms\Components\RichEditor::make('content')
                            ->toolbarButtons([
                                'attachFiles',
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'h2',
                                'h3',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'underline',
                                'undo',
                            ])
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('stories/attachments')
                            ->columnSpanFull()
                            ->visible(fn (Get $get) => $get('type') === 'recipes'),

                        Forms\Components\TextInput::make('youtube_url')
                            ->label('YouTube URL')
                            ->url()
                            ->placeholder('https://www.youtube.com/watch?v=...')
                            ->maxLength(500)
                            ->helperText('Thumbnail sẽ tự động lấy từ YouTube khi hiển thị ngoài frontend.')
                            ->columnSpanFull()
                            ->visible(fn (Get $get) => $get('type') === 'media'),
                    ]),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('featured')
                            ->label('Featured story')
                            ->helperText('Bài viết nổi bật hiển thị lớn ở đầu trang Explore.')
                            ->columnSpan(1),

                        Forms\Components\DateTimePicker::make('published_at')
                            ->label('Publish date')
                            ->columnSpan(1),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->square()
                    ->size(48)
                    ->defaultImageUrl(fn ($record) => $record->type === 'media' && $record->youtube_url
                        ? self::getYoutubeThumbnail($record->youtube_url)
                        : null
                    ),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),

                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'recipes' => 'success',
                        'media'   => 'info',
                        default   => 'gray',
                    }),

                Tables\Columns\IconColumn::make('featured')
                    ->boolean()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft'     => 'warning',
                        'published' => 'success',
                        default     => 'gray',
                    }),

                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'recipes' => 'Recipes',
                        'media'   => 'Media',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft'     => 'Draft',
                        'published' => 'Published',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListStories::route('/'),
            'create' => Pages\CreateStory::route('/create'),
            'edit'   => Pages\EditStory::route('/{record}/edit'),
        ];
    }

    public static function getYoutubeThumbnail(string $url): ?string
    {
        preg_match('/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $matches);
        return isset($matches[1])
            ? "https://img.youtube.com/vi/{$matches[1]}/hqdefault.jpg"
            : null;
    }
}
